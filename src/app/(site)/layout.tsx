import React, { type ReactNode } from "react";
import Link from "next/link";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header>
        <nav className="flex items-center justify-between p-4">
          <div className="flex gap-4">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
          </div>
          <div className="flex gap-4">
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </div>
        </nav>
      </header>
      {children}
    </>
  );
}
