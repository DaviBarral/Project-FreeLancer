'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Briefcase, User, LogOut } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  type: 'freelancer' | 'contratante';
}

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/');
  };

  if (!user) return null;

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Briefcase className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">FreelanceHub</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">{user.name}</span>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {user.type === 'freelancer' ? 'Freelancer' : 'Contratante'}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="text-sm">Sair</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}