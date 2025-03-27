
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  ChevronLeft, ChevronRight, LayoutDashboard, 
  ClipboardList, Database, Calendar, Settings, 
  LogOut, Users, BarChart2, Sliders 
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isMobile: boolean;
  mobileOpen: boolean;
  toggleMobileSidebar: () => void;
}

const Sidebar = ({ isMobile, mobileOpen, toggleMobileSidebar }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const { logout, user } = useAuth();
  const location = useLocation();

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

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

  const sidebarClasses = cn(
    'fixed inset-y-0 left-0 bg-sidebar z-30 w-64 flex flex-col transition-all duration-300 border-r border-sidebar-border',
    collapsed && 'w-20',
    isMobile && 'transform',
    isMobile && (mobileOpen ? 'translate-x-0' : '-translate-x-full')
  );

  return (
    <>
      {/* Mobile backdrop */}
      {isMobile && mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden animate-fade-in"
          onClick={toggleMobileSidebar}
        />
      )}

      <aside className={sidebarClasses}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
          <div className="flex items-center">
            {!collapsed && (
              <span className="ml-2 text-lg font-semibold text-white transition-opacity duration-200">
                Admin Portal
              </span>
            )}
          </div>
          
          <button 
            onClick={toggleCollapse}
            className="p-1 rounded-md text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent hidden lg:block transition-colors duration-200"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
          
          {isMobile && (
            <button 
              onClick={toggleMobileSidebar}
              className="p-1 rounded-md text-sidebar-foreground/70 hover:text-sidebar-foreground lg:hidden"
            >
              <ChevronLeft size={18} />
            </button>
          )}
        </div>

        {/* User info */}
        <div className={cn(
          "flex items-center py-4 px-4 border-b border-sidebar-border",
          collapsed ? "justify-center" : "justify-start"
        )}>
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
          
          {!collapsed && (
            <div className="ml-3 overflow-hidden transition-all duration-200">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.name}</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">{user?.role}</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => cn(
                    'sidebar-link',
                    isActive && 'active',
                    collapsed && 'justify-center'
                  )}
                >
                  <span className="text-sidebar-foreground/90">{item.icon}</span>
                  {!collapsed && <span className="ml-3">{item.name}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-sidebar-border mt-auto">
          <Button
            variant="ghost"
            className={cn(
              'w-full justify-start text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent',
              collapsed && 'justify-center'
            )}
            onClick={logout}
          >
            <LogOut size={20} />
            {!collapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
