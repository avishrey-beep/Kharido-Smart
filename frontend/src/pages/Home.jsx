import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShoppingBasket, Store, Map, Sun, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="p-5 flex flex-col gap-8 pb-10">
      {/* Hero Greeting - Designed like a hand-painted shop sign */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#A24A32] rounded-[2rem] p-7 text-[#FBF6EA] relative overflow-hidden border-[3px] border-[#2B2118] shadow-[6px_6px_0px_#2B2118]"
      >
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Sun size={24} className="text-[#E3A83B]" />
            <span className="text-[#EADFC7] text-sm uppercase tracking-widest font-bold">Good Morning</span>
          </div>
          <h2 className="text-4xl leading-none mb-2 text-[#FBF6EA]" style={{ fontFamily: "'Yatra One', cursive" }}>
            Namaste!
          </h2>
          <p className="text-[#FBF6EA] text-lg leading-snug mb-6 opacity-90 font-medium">
            Aaj kya kharidna hai?<br/>Find the best deals in your village.
          </p>
          <button 
            onClick={() => navigate('/shopping')}
            className="bg-[#E3A83B] text-[#2B2118] font-black px-6 py-3.5 rounded-xl flex items-center gap-2 text-lg hover:bg-[#C88A22] transition-colors border-[3px] border-[#2B2118] shadow-[4px_4px_0px_#2B2118] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
          >
            <ShoppingBasket size={22} strokeWidth={2.5} />
            Make Shopping List
          </button>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute right-[-20px] bottom-[-20px] opacity-20 transform rotate-[-15deg]">
          <ShoppingBasket size={180} color="#FBF6EA" />
        </div>
        <div className="absolute top-4 right-4 w-12 h-12 border-4 border-[#FBF6EA] opacity-20 rounded-full border-dashed animate-spin-slow"></div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-5">
        <button 
          onClick={() => navigate('/markets')} 
          className="bg-[#FBF6EA] p-5 rounded-[1.5rem] border-[3px] border-[#2B2118] shadow-[4px_4px_0px_#2B2118] flex flex-col items-center justify-center gap-3 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#4B6142] rounded-bl-full opacity-10"></div>
          <div className="w-14 h-14 bg-[#4B6142] text-[#FBF6EA] rounded-full flex items-center justify-center border-2 border-[#2B2118]">
            <Store size={28} />
          </div>
          <span className="font-bold text-[#2B2118] text-lg" style={{ fontFamily: "'Yatra One', cursive" }}>Markets</span>
        </button>
        
        <button 
          onClick={() => window.open('https://www.google.com/maps/search/nearby+mandi+market/', '_blank')}
          className="bg-[#FBF6EA] p-5 rounded-[1.5rem] border-[3px] border-[#2B2118] shadow-[4px_4px_0px_#2B2118] flex flex-col items-center justify-center gap-3 active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-16 h-16 bg-[#E3A83B] rounded-br-full opacity-20"></div>
          <div className="w-14 h-14 bg-[#E3A83B] text-[#2B2118] rounded-full flex items-center justify-center border-2 border-[#2B2118]">
            <Map size={28} />
          </div>
          <span className="font-bold text-[#2B2118] text-lg" style={{ fontFamily: "'Yatra One', cursive" }}>Mandi Map</span>
        </button>
      </div>

      {/* Featured Market */}
      <div className="mt-4">
        <div className="flex justify-between items-end mb-4 px-1">
          <h3 className="text-2xl text-[#2B2118]" style={{ fontFamily: "'Yatra One', cursive" }}>Top Market</h3>
          <span 
            onClick={() => navigate('/markets')}
            className="text-sm text-[#4B6142] font-bold cursor-pointer flex items-center hover:underline uppercase tracking-wider"
          >
            View All <ArrowRight size={16} className="ml-1" />
          </span>
        </div>
        
        <div className="bg-[#FBF6EA] rounded-[1.5rem] p-5 border-[3px] border-[#2B2118] shadow-[6px_6px_0px_#2B2118] flex flex-col gap-3 relative">
          <div className="absolute -top-4 right-4 flex items-center gap-1 bg-[#E3A83B] text-[#2B2118] px-3 py-1.5 rounded-full text-xs font-black border-2 border-[#2B2118] shadow-[2px_2px_0px_#2B2118] transform rotate-3">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse border border-[#2B2118]"></span>
            OPEN NOW
          </div>
          
          <h4 className="font-black text-[#2B2118] text-2xl mt-1">Kisan Mandi, Sadar</h4>
          <p className="text-sm font-bold text-[#5B4E3E] flex items-center gap-1">
            <Leaf size={14} className="text-[#4B6142]" /> Wholesale Mandi • 3.2 km away
          </p>
          
          <div className="bg-[#EADFC7] text-[#2B2118] text-xs p-3 rounded-xl mt-2 border-2 border-[#2B2118] border-dashed font-medium">
            <strong className="uppercase tracking-wider mr-1 text-[#A24A32]">Speciality:</strong> 
            Famous for fresh vegetables and wholesale grains.
          </div>
        </div>
      </div>
    </div>
  );
}
