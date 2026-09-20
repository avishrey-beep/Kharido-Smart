import React from 'react';
import { Home, ListChecks, Store } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function BottomNav() {
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/shopping', icon: ListChecks, label: 'List' },
    { path: '/markets', icon: Store, label: 'Markets' },
  ];

  return (
    <nav className="absolute bottom-0 left-0 right-0 h-16 bg-[#FBF6EA] border-t-[3px] border-[#2B2118] flex justify-around items-center z-10 pb-safe shadow-[0_-4px_0_rgba(43,33,24,0.05)]">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center p-2 mt-[-10px] transition-all relative ${
              isActive ? 'text-[#4B6142] transform translate-y-[2px]' : 'text-[#5B4E3E] hover:text-[#4B6142]'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <div className="absolute top-0 w-8 h-1 bg-[#4B6142] rounded-b-md"></div>
              )}
              <div className={`p-2 rounded-xl mt-2 ${isActive ? 'bg-[#EADFC7] border-2 border-[#2B2118]' : ''}`}>
                <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] mt-1 font-bold ${isActive ? 'text-[#2B2118]' : ''}`}>{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
