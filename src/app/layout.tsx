import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import "@/styles/main.css";

// Berkeley Mono Variable is loaded via the @font-face in typography.css

export const metadata: Metadata = {
  title: "Starter",
  description:
    "A versatile Next.js starter template combining documentation, portfolio, and blog capabilities. Features a comprehensive design system with custom typography, responsive layouts, and modular architecture.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="body-base"
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          <Navbar />
          <main className="main-container">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
