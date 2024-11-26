import React from 'react';
import { Users, Shield, Settings, BarChart3, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Users', href: '/', icon: Users },
  { name: 'Roles', href: '/roles', icon: Shield },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
];

export default function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div className={`${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 bg-gray-900 min-h-screen p-4 text-white relative`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-9 bg-gray-800 rounded-full p-1.5 hover:bg-gray-700"
      >
        <Menu size={16} />
      </button>
      
      <div className="flex items-center space-x-3 mb-10">
        <Shield size={32} className="text-indigo-500" />
        {isOpen && <span className="text-xl font-bold">RBAC Admin</span>}
      </div>

      <nav className="space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Icon size={20} />
              {isOpen && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}