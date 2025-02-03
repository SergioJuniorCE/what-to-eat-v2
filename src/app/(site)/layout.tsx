import React, { type ReactNode } from "react";
import { AppSidebar } from "./sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="ml-3 w-screen">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
