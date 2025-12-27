import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Home, Users, MessageCircle, User } from 'lucide-react';

export function Header() {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/nearby', label: 'Users', icon: Users },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <header className="bg-white border-b border-border sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/dashboard">
            <h3 className="text-[#2563eb]">SwapCash</h3>
          </Link>
          
          <nav className="flex gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path}>
                  <Button 
                    variant={isActive ? 'default' : 'ghost'}
                    size="sm"
                    className={isActive ? 'bg-[#2563eb] hover:bg-[#1d4ed8]' : ''}
                  >
                    <Icon className="w-4 h-4 md:mr-2" />
                    <span className="hidden md:inline">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
