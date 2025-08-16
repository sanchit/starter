"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function UploadPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [parentSlug, setParentSlug] = useState("");
  const [mainFile, setMainFile] = useState<File | null>(null);
  const [rightFile, setRightFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Redirect if not authenticated
  if (status === "unauthenticated") {
    router.push("/admin/login");
    return null;
  }

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    
    // Generate slug automatically
    const generatedSlug = newTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    setSlug(generatedSlug);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("slug", slug);
      formData.append("parentSlug", parentSlug);
      
      if (mainFile) {
        formData.append("mainFile", mainFile);
      }
      if (rightFile) {
        formData.append("rightFile", rightFile);
      }

      const response = await fetch("/api/upload-docs", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Upload failed");
      }

      setSuccess("Documentation uploaded successfully!");
      
      // Reset form
      setTitle("");
      setSlug("");
      setParentSlug("");
      setMainFile(null);
      setRightFile(null);
      
      // Reset file inputs
      const fileInputs = document.querySelectorAll('input[type="file"]') as NodeListOf<HTMLInputElement>;
      fileInputs.forEach(input => input.value = '');
      
      // Optionally redirect to the new page
      setTimeout(() => {
        const newPath = parentSlug ? `${parentSlug}/${slug}` : slug;
        router.push(`/docs/${newPath}`);
      }, 2000);
      
    } catch (error) {
      setError(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1 className="admin-title">Upload Documentation</h1>
        <a href="/admin" className="admin-nav-link">
          Back to Dashboard
        </a>
      </div>

      <div className="admin-content">
        <form onSubmit={handleSubmit} className="upload-form">
          <div className="admin-card">
            <h2 className="admin-card-title">Page Information</h2>
            
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Page Title *
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={handleTitleChange}
                className="form-input"
                placeholder="e.g., Getting Started"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="slug" className="form-label">
                URL Slug *
              </label>
              <input
                id="slug"
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="form-input"
                placeholder="e.g., getting-started"
                pattern="[a-z0-9-]+"
                required
              />
              <p className="form-hint">
                URL will be: /docs/{parentSlug && `${parentSlug}/`}{slug || "slug"}
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="parent" className="form-label">
                Parent Section (Optional)
              </label>
              <input
                id="parent"
                type="text"
                value={parentSlug}
                onChange={(e) => setParentSlug(e.target.value)}
                className="form-input"
                placeholder="e.g., installation"
                pattern="[a-z0-9-]*"
              />
              <p className="form-hint">
                Leave empty for top-level pages
              </p>
            </div>
          </div>

          <div className="admin-card">
            <h2 className="admin-card-title">Content Files</h2>
            
            <div className="form-group">
              <label htmlFor="mainFile" className="form-label">
                Main Content (MDX) *
              </label>
              <input
                id="mainFile"
                type="file"
                accept=".mdx,.md"
                onChange={(e) => setMainFile(e.target.files?.[0] || null)}
                className="form-input-file"
                required
              />
              <p className="form-hint">
                The main documentation content
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="rightFile" className="form-label">
                Right Panel Content (MDX)
              </label>
              <input
                id="rightFile"
                type="file"
                accept=".mdx,.md"
                onChange={(e) => setRightFile(e.target.files?.[0] || null)}
                className="form-input-file"
              />
              <p className="form-hint">
                Optional: Code examples or supplementary content
              </p>
            </div>
          </div>

          {error && (
            <div className="error-message">{error}</div>
          )}
          
          {success && (
            <div className="success-message">{success}</div>
          )}

          <button
            type="submit"
            className="submit-button"
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload Documentation"}
          </button>
        </form>
      </div>
    </div>
  );
}