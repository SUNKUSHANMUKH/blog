import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Blogs for Ever and Ever",
  description:
    "A blog powered by Next.js and Tailwind CSS for frontend and Nestjs and MongoDB for backend",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <div className="max-w-4xl mx-auto p-6">
          <header className="flex items-center justify-between mb-10">
            <a href="/" className="text-3xl font-bold">
              BLOG N BLOGS
            </a>
            <a
              href="/posts/new"
              className="px-3 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              + New Post
            </a>
          </header>

          {children}
        </div>

        {/* ✅ Toast notifications */}
        <Toaster
          position="top-center" // 👈 default to center
          reverseOrder={false}
          toastOptions={{
            success: {
              style: {
                background: "#4CAF50",
                color: "#fff",
                fontSize: "1rem",
                borderRadius: "12px",
              },
            },
            error: {
              style: {
                background: "#f44336",
                color: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
