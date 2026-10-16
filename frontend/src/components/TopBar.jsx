import React, { useState, useEffect } from 'react';
import { MapPin, LogOut, Languages } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TopBar() {
  const navigate = useNavigate();
  const [villageName, setVillageName] = useState('Sadar Village, UP');
  const [lang, setLang] = useState('HI'); // 'HI' or 'EN'

  useEffect(() => {
    try {
      const stored = localStorage.getItem('kharido_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.village) setVillageName(`${parsed.village}, UP`);
      }
    } catch (e) {
      // Default village
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('kharido_user');
    navigate('/login');
  };

  const toggleLanguage = () => {
    setLang(prev => prev === 'HI' ? 'EN' : 'HI');
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#FBF6EA] border-b-[3px] border-[#2B2118] flex items-center justify-between px-4 z-50 shadow-[0_4px_0_rgba(43,33,24,0.08)]">
      {/* Brand & Location */}
      <div className="flex flex-col">
        <h1 className="text-2xl text-[#A24A32] flex items-center gap-1 leading-tight" style={{ fontFamily: "'Yatra One', cursive" }}>
          KharidoSmart
        </h1>
        <div className="flex items-center text-xs text-[#5B4E3E] font-bold mt-[-2px]">
          <MapPin size={12} className="mr-1 text-[#4B6142] shrink-0" />
          <span className="truncate max-w-[140px] sm:max-w-xs">{villageName}</span>
        </div>
      </div>
      
      {/* Right Controls */}
      <div className="flex items-center gap-2">
        {/* Bilingual Language Switcher */}
        <button
          onClick={toggleLanguage}
          className="px-2.5 py-1.5 rounded-xl bg-[#EADFC7] hover:bg-[#dfd1b5] text-[#2B2118] border-2 border-[#2B2118] shadow-[2px_2px_0_#2B2118] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center gap-1.5 text-xs font-black"
          title="Toggle Language (भाषा बदलें)"
        >
          <Languages size={14} className="text-[#A24A32]" />
          <span>{lang === 'HI' ? 'हिन्दी' : 'English'}</span>
        </button>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="p-2 rounded-xl bg-[#EADFC7] hover:bg-[#dfd1b5] text-[#A24A32] border-2 border-[#2B2118] shadow-[2px_2px_0_#2B2118] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          title="Logout (लॉग आउट)"
        >
          <LogOut size={18} strokeWidth={2.5} />
        </button>
      </div>
    </header>
  );
}
