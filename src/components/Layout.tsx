
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Toaster } from '@/components/ui/toaster';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-nav-blue shadow-md z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[250px] sm:w-[300px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <a href="/" className="px-4 py-2 hover:bg-nav-blue-light rounded-md">Home</a>
                  <a href="/profile" className="px-4 py-2 hover:bg-nav-blue-light rounded-md">Profile</a>
                  <a href="/vehicles" className="px-4 py-2 hover:bg-nav-blue-light rounded-md">Vehicles</a>
                  <a href="/navigation" className="px-4 py-2 hover:bg-nav-blue-light rounded-md">Navigation</a>
                  <a href="/hazards" className="px-4 py-2 hover:bg-nav-blue-light rounded-md">Hazard Map</a>
                </nav>
              </SheetContent>
            </Sheet>
            <h1 className="ml-2 lg:ml-0 text-xl md:text-2xl font-bold text-white">
              RoadWise Navigator UK
            </h1>
          </div>
          
          <div className="hidden lg:flex items-center space-x-4">
            <nav className="flex items-center space-x-4">
              <a href="/" className="text-white hover:text-nav-alert-light">Home</a>
              <a href="/profile" className="text-white hover:text-nav-alert-light">Profile</a>
              <a href="/vehicles" className="text-white hover:text-nav-alert-light">Vehicles</a>
              <a href="/navigation" className="text-white hover:text-nav-alert-light">Navigation</a>
              <a href="/hazards" className="text-white hover:text-nav-alert-light">Hazard Map</a>
            </nav>
          </div>
          
          {user && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={logout}
              className="text-white hover:text-nav-alert-light"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          )}
        </div>
      </header>
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="bg-nav-blue-dark text-white text-center py-4 text-sm">
        <div className="container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} RoadWise Navigator UK - Your HGV & PSV Navigation Solution</p>
          <p className="text-xs text-gray-400 mt-1">Safe journeys for heavy vehicles across the United Kingdom</p>
        </div>
      </footer>
      
      <Toaster />
    </div>
  );
};

export default Layout;
