import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

// Helper to sanitize file paths
function sanitizePath(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')
    .replace(/--+/g, '-')
    .trim();
}

// Validate MDX content
function validateMdxContent(content: string): { valid: boolean; error?: string } {
  // Check for frontmatter
  if (!content.startsWith('---')) {
    return { 
      valid: false, 
      error: 'MDX file must start with frontmatter (---)'
    };
  }

  // Check for title in frontmatter
  const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) {
    return {
      valid: false,
      error: 'Invalid frontmatter format'
    };
  }

  const frontmatter = frontmatterMatch[1];
  if (!frontmatter.includes('title:')) {
    return {
      valid: false,
      error: 'Frontmatter must include a title field'
    };
  }

  return { valid: true };
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const parentSlug = formData.get("parentSlug") as string;
    const mainFile = formData.get("mainFile") as File;
    const rightFile = formData.get("rightFile") as File | null;

    // Validate required fields
    if (!title || !slug || !mainFile) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Sanitize paths
    const sanitizedSlug = sanitizePath(slug);
    const sanitizedParent = parentSlug ? sanitizePath(parentSlug) : '';

    if (!sanitizedSlug) {
      return NextResponse.json(
        { error: "Invalid slug" },
        { status: 400 }
      );
    }

    // Build directory path
    const contentsDir = path.join(process.cwd(), 'contents');
    const targetDir = sanitizedParent 
      ? path.join(contentsDir, sanitizedParent, sanitizedSlug)
      : path.join(contentsDir, sanitizedSlug);

    // Check if directory already exists
    if (existsSync(targetDir)) {
      return NextResponse.json(
        { error: "A page with this slug already exists" },
        { status: 409 }
      );
    }

    // Read and validate main file content
    const mainContent = await mainFile.text();
    const mainValidation = validateMdxContent(mainContent);
    if (!mainValidation.valid) {
      return NextResponse.json(
        { error: `Main file error: ${mainValidation.error}` },
        { status: 400 }
      );
    }

    // Validate right panel file if provided
    let rightContent: string | null = null;
    if (rightFile && rightFile.size > 0) {
      rightContent = await rightFile.text();
      const rightValidation = validateMdxContent(rightContent);
      if (!rightValidation.valid) {
        return NextResponse.json(
          { error: `Right panel file error: ${rightValidation.error}` },
          { status: 400 }
        );
      }
    }

    // Create directory
    await mkdir(targetDir, { recursive: true });

    // Write main content
    const mainPath = path.join(targetDir, 'index.mdx');
    await writeFile(mainPath, mainContent, 'utf-8');

    // Write right panel content if provided
    if (rightContent) {
      const rightPath = path.join(targetDir, 'right-panel.mdx');
      await writeFile(rightPath, rightContent, 'utf-8');
    }

    // Return success with the new page path
    const newPath = sanitizedParent 
      ? `${sanitizedParent}/${sanitizedSlug}`
      : sanitizedSlug;

    return NextResponse.json({
      success: true,
      path: newPath,
      message: "Documentation uploaded successfully"
    });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 }
    );
  }
}