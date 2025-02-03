import React, { type ReactNode } from "react";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { FoodProvider } from "@/providers/food-provider";

import { AppSidebar } from "./sidebar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <FoodProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="ml-3 w-screen">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </FoodProvider>
  );
}
