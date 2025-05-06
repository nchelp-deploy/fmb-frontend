import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import { 
  HomeIcon as HomeIconSolid,
  BellIcon as BellIconSolid,
  ChatBubbleLeftRightIcon as ChatIconSolid,
  UserCircleIcon as UserCircleIconSolid
} from '@heroicons/react/24/solid';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    {
      name: 'Home',
      path: '/dashboard',
      icon: <HomeIcon className="w-6 h-6" />,
      activeIcon: <HomeIconSolid className="w-6 h-6" />
    },
    {
      name: 'Notifications',
      path: '/notifications',
      icon: <BellIcon className="w-6 h-6" />,
      activeIcon: <BellIconSolid className="w-6 h-6" />
    },
    {
      name: 'Support',
      path: '/support',
      icon: <ChatBubbleLeftRightIcon className="w-6 h-6" />,
      activeIcon: <ChatIconSolid className="w-6 h-6" />
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: <UserCircleIcon className="w-6 h-6" />,
      activeIcon: <UserCircleIconSolid className="w-6 h-6" />
    }
  ];

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe z-50">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center px-4 py-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex flex-col items-center min-w-[64px] py-1 ${
                location.pathname === item.path 
                  ? 'text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="p-1.5 rounded-full transition-colors">
                {location.pathname === item.path ? item.activeIcon : item.icon}
              </div>
              <span className="text-xs mt-0.5 font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomNav; 