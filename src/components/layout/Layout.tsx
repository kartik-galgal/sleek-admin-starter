
import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

const Layout = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (!isMobile) {
      setMobileOpen(false);
    }
  }, [isMobile]);

  // Close sidebar when clicking on a link (mobile)
  useEffect(() => {
    const handleRouteChange = () => {
      if (isMobile) {
        setMobileOpen(false);
      }
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [isMobile]);

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
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar 
        isMobile={isMobile} 
        mobileOpen={mobileOpen} 
        toggleMobileSidebar={toggleMobileSidebar} 
      />
      
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        <Header toggleMobileSidebar={toggleMobileSidebar} />
        
        <main className="flex-1 overflow-auto p-4 lg:p-6 bg-background animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
