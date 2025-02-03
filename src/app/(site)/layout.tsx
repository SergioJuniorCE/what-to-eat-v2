import React, { type ReactNode } from "react";
import { AppSidebar } from "./sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-screen">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
