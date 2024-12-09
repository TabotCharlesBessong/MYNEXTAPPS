import BreadcrumpHeader from "@/components/BreadcrumpHeader";
import DesktopSidebar from "@/components/Sidebar";
import { ModeToggle } from "@/components/ThemeModeToggle";
import { SelectSeparator } from "@/components/ui/select";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen">
      <DesktopSidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <header className="flex items-center justify-between px-6 py-4 h-[50px] container">
          <BreadcrumpHeader />
          <div className="gap-1 flex items-center">
            <ModeToggle />
          </div>
        </header>
        <SelectSeparator />
        <div className="overflow-auto">
          <div className="flex-1 container py-4 text-accent foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default layout;
