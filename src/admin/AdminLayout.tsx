import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  Package,
  Users,
  ShoppingCart,
  FileText,
  LogOut,
  Search,
  Bell,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adminLogout, getAdminSession } from "./auth";

const navItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard, end: true },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
];

const futureItems = [
  { title: "Products", url: "/admin/products", icon: Package },
  { title: "Orders", url: "/admin/orders", icon: ShoppingCart },
  { title: "Customers", url: "/admin/customers", icon: Users },
  { title: "Content", url: "/admin/content", icon: FileText },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const session = getAdminSession();
  const { pathname } = useLocation();

  const handleLogout = () => {
    adminLogout();
    navigate("/admin/login");
  };

  return (
    <div className="admin-theme">
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background text-foreground">
          <Sidebar collapsible="icon">
            <SidebarHeader className="border-b border-sidebar-border">
              <div className="flex items-center gap-2 px-2 py-3">
                <div className="h-8 w-8 rounded-md bg-primary text-primary-foreground grid place-items-center text-sm font-semibold">
                  N
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-semibold">Nature's Way</span>
                  <span className="text-[11px] text-muted-foreground">Admin Console</span>
                </div>
              </div>
            </SidebarHeader>

            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Overview</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {navItems.map((item) => (
                      <SidebarMenuItem key={item.url}>
                        <SidebarMenuButton
                          asChild
                          isActive={item.end ? pathname === item.url : pathname.startsWith(item.url)}
                        >
                          <NavLink to={item.url} end={item.end}>
                            <item.icon />
                            <span>{item.title}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel>Operations (coming soon)</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {futureItems.map((item) => (
                      <SidebarMenuItem key={item.url}>
                        <SidebarMenuButton disabled className="opacity-50 cursor-not-allowed">
                          <item.icon />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t border-sidebar-border">
              <div className="px-2 py-2 text-xs text-muted-foreground truncate">
                {session?.email ?? "Not signed in"}
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="justify-start gap-2">
                <LogOut className="h-4 w-4" /> <span>Sign out</span>
              </Button>
            </SidebarFooter>
          </Sidebar>

          <div className="flex-1 flex flex-col min-w-0">
            <header className="h-14 border-b border-border bg-card flex items-center gap-3 px-4 sticky top-0 z-10">
              <SidebarTrigger />
              <div className="relative max-w-md w-full">
                <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search orders, products, customers…"
                  className="pl-9 h-9 bg-background"
                />
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Bell className="h-4 w-4" />
                </Button>
                <div className="h-8 w-8 rounded-full bg-accent text-accent-foreground grid place-items-center text-xs font-semibold">
                  AD
                </div>
              </div>
            </header>

            <main className="flex-1 p-6 overflow-x-hidden">
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  );
}
