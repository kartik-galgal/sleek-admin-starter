
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Header from './Header';
import { useAuth } from '@/context/AuthContext';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarInset,
  SidebarRail
} from '@/components/ui/sidebar';
import MainSidebar from './MainSidebar';

const Layout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin-slow"></div>
          <p className="mt-4 text-sm text-muted-foreground animate-pulse-gentle">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-svh w-full">
        <MainSidebar />
        
        <SidebarInset className="flex flex-col">
          <Header />
          <main className="flex-1 overflow-auto p-4 lg:p-6 bg-background animate-fade-in">
            <Outlet />
          </main>
        </SidebarInset>
        
        <SidebarRail />
      </div>
    </SidebarProvider>
  );
};

export default Layout;
