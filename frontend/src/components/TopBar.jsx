import React from 'react';
import { MapPin, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TopBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('kharido_user');
    navigate('/login');
  };

  return (
    <header className="absolute top-0 left-0 right-0 h-16 bg-[#FBF6EA] border-b-[3px] border-[#2B2118] flex items-center justify-between px-4 z-10 shadow-[0_4px_0_rgba(43,33,24,0.08)]">
      <div className="flex flex-col">
        <h1 className="text-2xl text-[#A24A32] flex items-center gap-1" style={{ fontFamily: "'Yatra One', cursive" }}>
          KharidoSmart
        </h1>
        <div className="flex items-center text-xs text-[#5B4E3E] font-bold mt-[-2px]">
          <MapPin size={12} className="mr-1 text-[#4B6142]" />
          <span>Sadar Village, UP</span>
        </div>
      </div>
      
      <button 
        onClick={handleLogout}
        className="p-2 rounded-xl bg-[#EADFC7] text-[#A24A32] border-2 border-[#2B2118] shadow-[2px_2px_0_#2B2118] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
        title="Logout"
      >
        <LogOut size={20} strokeWidth={2.5} />
      </button>
    </header>
  );
}
