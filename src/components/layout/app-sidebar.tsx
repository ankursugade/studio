
"use client";

import { 
  LayoutDashboard, 
  Kanban, 
  ListTodo, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Calculator
} from "lucide-react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { useQSStore } from "@/hooks/use-qs-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const { currentUser, logout } = useQSStore();
  const pathname = usePathname();

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border h-16 flex items-center px-6">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-white group-data-[collapsible=icon]:hidden">
          <Calculator className="w-6 h-6 text-accent" />
          <span>QS FLOW</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="py-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/"} tooltip="Dashboard">
              <Link href="/">
                <LayoutDashboard />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/kanban"} tooltip="Workflow Board">
              <Link href="/kanban">
                <Kanban />
                <span>Workflow Board</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/projects"} tooltip="My Projects">
              <Link href="/projects">
                <ListTodo />
                <span>My Projects</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        {currentUser && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 group-data-[collapsible=icon]:hidden">
              <Avatar className="h-9 w-9 border border-accent">
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-medium truncate">{currentUser.name}</span>
                <span className="text-xs text-muted-foreground truncate">{currentUser.role}</span>
              </div>
            </div>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={logout} className="text-destructive hover:text-destructive/80" tooltip="Log Out">
                  <LogOut />
                  <span>Log Out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
