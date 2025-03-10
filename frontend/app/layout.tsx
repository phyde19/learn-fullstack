import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "DevBlog - A Fullstack Learning Project",
  description: "A simple blog application built with Next.js and FastAPI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100`}
      >
        <nav className="bg-white dark:bg-gray-800 shadow-sm py-4">
          <div className="max-w-5xl mx-auto flex justify-between items-center px-6">
            <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              DevBlog
            </Link>
            <div className="flex gap-6">
              <Link href="/posts" className="hover:text-blue-600 dark:hover:text-blue-400">
                Posts
              </Link>
              <Link href="/posts/new" className="hover:text-blue-600 dark:hover:text-blue-400">
                Create Post
              </Link>
            </div>
          </div>
        </nav>
        
        <main className="py-8">
          {children}
        </main>
        
        <footer className="border-t dark:border-gray-700 mt-12 py-6 text-center text-gray-500 dark:text-gray-400 text-sm">
          <div className="max-w-5xl mx-auto px-6">
            <p>Built with Next.js & FastAPI - A Fullstack Learning Project</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
