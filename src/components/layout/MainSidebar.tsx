
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Database, 
  Calendar, 
  Settings, 
  LogOut, 
  Users, 
  BarChart2, 
  Sliders 
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  useSidebar
} from '@/components/ui/sidebar';

const MainSidebar = () => {
  const { logout, user } = useAuth();
  const location = useLocation();
  const { state } = useSidebar();

  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/forms', name: 'Forms', icon: <ClipboardList size={20} /> },
    { path: '/data-table', name: 'Data Table', icon: <Database size={20} /> },
    { path: '/ui-components', name: 'UI Components', icon: <Sliders size={20} /> },
    { path: '/calendar', name: 'Calendar', icon: <Calendar size={20} /> },
    { path: '/analytics', name: 'Analytics', icon: <BarChart2 size={20} /> },
    { path: '/user-management', name: 'Users', icon: <Users size={20} /> },
    { path: '/settings', name: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center h-16 px-4">
          <div className="flex items-center">
            <span className="ml-2 text-lg font-semibold text-sidebar-foreground">
              Admin Portal
            </span>
          </div>
        </div>
        
        {/* User info */}
        <div className="flex items-center px-4 py-3 border-b border-sidebar-border">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-primary/20 overflow-hidden">
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user?.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/20 text-primary-foreground">
                  {user?.name?.substring(0, 1)}
                </div>
              )}
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-sidebar" />
          </div>
          
          <div className="ml-3 overflow-hidden">
            <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.name}</p>
            <p className="text-xs text-sidebar-foreground/60 truncate">{user?.role}</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.path}
                    tooltip={item.name}
                  >
                    <NavLink to={item.path}>
                      {item.icon}
                      <span>{item.name}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={logout}
        >
          <LogOut size={20} />
          <span className="ml-2">Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default MainSidebar;
