
import React from 'react';
import { Bell, Search, SunMoon, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { SidebarTrigger } from '@/components/ui/sidebar';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background px-4 lg:px-6">
      <div className="flex items-center gap-2 md:gap-4">
        <SidebarTrigger />
      </div>
      
      <div className="w-full flex-1 flex justify-between">
        <form className="hidden md:block relative w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-2/3 lg:w-full"
          />
        </form>
        
        <div className="ml-auto flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full">
            <SunMoon className="h-5 w-5" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
