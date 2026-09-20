import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Particles() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(10)].map((_, i) => {
        const left = `${Math.floor(Math.random() * 90 + 5)}%`;
        const size = `${Math.floor(Math.random() * 6 + 4)}px`;
        const animDuration = `${Math.floor(Math.random() * 15 + 15)}s`;
        const animDelay = `${Math.floor(Math.random() * 5)}s`;
        const colors = ['#E3A83B', '#A24A32', '#4B6142', '#D9CBA8'];
        const color = colors[i % colors.length];

        return (
          <div
            key={i}
            className="absolute bottom-[-20px] rounded-full opacity-80"
            style={{
              left,
              width: size,
              height: size,
              backgroundColor: color,
              animation: `particleDrift ${animDuration} linear ${animDelay} infinite`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes particleDrift {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes sway {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes lanternGlow {
          0%, 100% { filter: drop-shadow(0 0 6px rgba(227,168,59,0.4)); }
          50% { filter: drop-shadow(0 0 18px rgba(227,168,59,0.7)); }
        }
      `}</style>
    </div>
  );
}

function Bunting() {
  return (
    <div className="absolute top-0 left-0 right-0 h-12 overflow-hidden z-10 pointer-events-none opacity-80">
      <div className="absolute top-2 left-[-10px] right-[-10px] h-[2px] bg-[#D9C9A3]" style={{ borderRadius: '50% / 100% 100% 0 0', transform: 'scaleY(-1)' }}></div>
      <div className="flex justify-around absolute top-2 w-full px-4">
        {[...Array(8)].map((_, i) => {
          const colors = ['#A24A32', '#E3A83B', '#4B6142', '#EADFC7'];
          return (
            <div
              key={i}
              className="w-4 h-6 clip-polygon-bunting origin-top"
              style={{
                backgroundColor: colors[i % colors.length],
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                animation: `sway 3s ease-in-out ${i * 0.2}s infinite`
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

function StallSVG() {
  return (
    <svg className="w-full max-w-[240px] mx-auto drop-shadow-md" viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg" role="img">
      {/* Lantern */}
      <g style={{ animation: 'lanternGlow 4s ease-in-out infinite' }}>
        <line x1="176" y1="22" x2="176" y2="48" stroke="#EFE2C9" strokeWidth="1.5"/>
        <ellipse cx="176" cy="58" rx="13" ry="15" fill="#E3A83B"/>
        <ellipse cx="176" cy="58" rx="7" ry="9" fill="#F5D06B" fillOpacity="0.6"/>
        <rect x="176" y="40" width="1.5" height="8" fill="#4A3410"/>
      </g>
      {/* Stall poles */}
      <rect x="46" y="70" width="8" height="120" fill="#4B3A2C" rx="2"/>
      <rect x="246" y="70" width="8" height="120" fill="#4B3A2C" rx="2"/>
      {/* Awning */}
      <rect x="38" y="44" width="224" height="28" fill="#A24A32" rx="2"/>
      <rect x="38" y="44" width="22" height="28" fill="#E3A83B" rx="1"/>
      <rect x="82" y="44" width="22" height="28" fill="#E3A83B" rx="1"/>
      <rect x="126" y="44" width="22" height="28" fill="#E3A83B" rx="1"/>
      <rect x="170" y="44" width="22" height="28" fill="#E3A83B" rx="1"/>
      <rect x="214" y="44" width="22" height="28" fill="#E3A83B" rx="1"/>
      {/* Awning tassels */}
      <polygon points="40,72 52,72 46,88" fill="#A24A32"/>
      <polygon points="62,72 74,72 68,88" fill="#E3A83B"/>
      <polygon points="84,72 96,72 90,88" fill="#A24A32"/>
      <polygon points="106,72 118,72 112,88" fill="#E3A83B"/>
      <polygon points="128,72 140,72 134,88" fill="#A24A32"/>
      <polygon points="150,72 162,72 156,88" fill="#E3A83B"/>
      <polygon points="172,72 184,72 178,88" fill="#A24A32"/>
      <polygon points="194,72 206,72 200,88" fill="#E3A83B"/>
      <polygon points="216,72 228,72 222,88" fill="#A24A32"/>
      <polygon points="238,72 250,72 244,88" fill="#E3A83B"/>
      {/* Basket */}
      <path d="M70 190 L100 130 L200 130 L230 190 Z" fill="#8A5A3F"/>
      <path d="M74 188 L98 134 L202 134 L226 188 Z" fill="none" stroke="#6B4530" strokeWidth="1"/>
      <path d="M78 186 L200 186" stroke="#6B4530" strokeWidth="1.5"/>
      <path d="M86 168 L212 168" stroke="#6B4530" strokeWidth="1.5"/>
      <path d="M96 148 L204 148" stroke="#6B4530" strokeWidth="1.5"/>
      {/* Veggies */}
      <circle cx="115" cy="126" r="12" fill="#4B6142"/>
      <circle cx="115" cy="126" r="6" fill="#6B8B5E" fillOpacity="0.4"/>
      <circle cx="140" cy="119" r="14" fill="#A24A32"/>
      <circle cx="140" cy="119" r="7" fill="#C45B3A" fillOpacity="0.3"/>
      <circle cx="165" cy="123" r="11" fill="#E3A83B"/>
      <circle cx="165" cy="123" r="5" fill="#F5D06B" fillOpacity="0.4"/>
      <circle cx="188" cy="127" r="10" fill="#4B6142"/>
      <circle cx="188" cy="127" r="5" fill="#6B8B5E" fillOpacity="0.4"/>
      {/* Ground line */}
      <line x1="30" y1="192" x2="270" y2="192" stroke="#6B4530" strokeWidth="1" strokeDasharray="4 4" strokeOpacity="0.4"/>
    </svg>
  );
}

function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [village, setVillage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phone && password) {
      localStorage.setItem('kharido_user', JSON.stringify({ phone, village: isRegister ? village : 'Sadar Village' }));
      window.location.href = '/';
    } else {
      alert("Kripya apna details darj karein.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 w-full relative z-20 bg-transparent overflow-x-hidden">
      <Particles />
      <Bunting />

      <div className="relative z-30 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 w-full max-w-6xl mx-auto py-10">
        
        {/* Left Column: Hero & Info */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1 max-w-lg">
          <div className="w-full max-w-[280px] lg:max-w-[360px] mx-auto lg:mx-0">
            <StallSVG />
          </div>
          <h1 className="text-5xl lg:text-7xl text-gray-800 leading-none mt-6 drop-shadow-sm" style={{ fontFamily: "'Yatra One', cursive" }}>
            Where's the haat<br />today?
          </h1>
          <svg className="w-3/4 max-w-[200px] lg:max-w-[280px] h-4 mt-3 mb-6 mx-auto lg:mx-0" viewBox="0 0 200 16" preserveAspectRatio="none">
            <path d="M2 11 C 40 2, 80 15, 120 7 S 180 2, 198 9" fill="none" stroke="#E3A83B" strokeWidth="4" strokeLinecap="round"/>
          </svg>
          
          {/* Taglines */}
          <p className="text-[#E3A83B] text-2xl lg:text-3xl font-bold mb-3 drop-shadow-sm" style={{ textShadow: '0 0 12px rgba(227,168,59,0.3)' }}>
            अपने बाज़ार को जानिए, सही दाम पर खरीदिए।
          </p>
          <p className="text-[#5B4E3E] text-base lg:text-lg font-medium mb-8 max-w-md mx-auto lg:mx-0">
            Your personal market assistant. Compare prices, discover weekly haats, and never overpay again.
          </p>

          {/* Feature Bullets */}
          <div className="bg-[#FBF6EA] border-[3px] border-[#2B2118] rounded-xl p-5 shadow-[6px_6px_0_#2B2118] w-full">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-[#A24A32] mt-0.5 text-lg">●</span>
                <div className="text-base text-[#2B2118] leading-tight">
                  <span className="font-black">Smart Comparison</span> – instantly find the cheapest mandi.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#E3A83B] mt-0.5 text-lg">●</span>
                <div className="text-base text-[#2B2118] leading-tight">
                  <span className="font-black">Live Availability</span> – know if a market is open before traveling.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#4B6142] mt-0.5 text-lg">●</span>
                <div className="text-base text-[#2B2118] leading-tight">
                  <span className="font-black">Bazaar Saathi</span> – AI chat to answer all your mandi queries.
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Ticket Form */}
        <div className="w-full max-w-[380px] bg-[#FBF6EA] rounded-md shadow-[0_12px_36px_rgba(43,33,24,0.25)] p-8 lg:p-10 pt-12 relative border-[2px] border-[#D9C9A3] lg:mt-0 mt-8 shrink-0">
          {/* Hole Punch & Tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#F2E9D8] shadow-inner" style={{ boxShadow: 'inset 0 3px 6px rgba(0,0,0,0.12)' }}></div>
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-[#EADFC7] opacity-70 transform -rotate-3 rounded-sm shadow-sm"></div>

          <div className="text-center space-y-2 mb-8">
            <h2 className="text-4xl text-gray-800" style={{ fontFamily: "'Yatra One', cursive" }}>
              {isRegister ? 'Join the bazaar' : 'Enter the bazaar'}
            </h2>
            <p className="text-[#5B4E3E] text-base font-medium">
              {isRegister ? 'Create a new account.' : 'Log in with your credentials.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[#5B4E3E] text-xs font-bold ml-1 uppercase tracking-wider">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 9876543210"
                className="w-full px-4 py-3.5 bg-transparent border-2 border-[#D9C9A3] rounded-lg focus:outline-none focus:border-[#A24A32] text-gray-800 font-bold placeholder-[#C9BBA0] transition-colors text-lg"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-[#5B4E3E] text-xs font-bold ml-1 uppercase tracking-wider">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3.5 bg-transparent border-2 border-[#D9C9A3] rounded-lg focus:outline-none focus:border-[#A24A32] text-gray-800 font-bold placeholder-[#C9BBA0] transition-colors text-lg"
              />
            </div>

            {isRegister && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-1.5">
                <label className="text-[#5B4E3E] text-xs font-bold ml-1 uppercase tracking-wider">Village Name</label>
                <input
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  placeholder="e.g. Sadar Village"
                  className="w-full px-4 py-3.5 bg-transparent border-2 border-[#D9C9A3] rounded-lg focus:outline-none focus:border-[#A24A32] text-gray-800 font-bold placeholder-[#C9BBA0] transition-colors text-lg"
                />
              </motion.div>
            )}

            <button
              type="submit"
              className="w-full bg-[#A24A32] hover:bg-[#8e3f29] text-[#FBF6EA] font-black py-4 rounded-xl shadow-lg active:scale-[0.98] transition-all text-xl mt-4 flex items-center justify-center gap-2 border-2 border-[#2B2118]"
            >
              {isRegister ? 'Register' : 'Log in'} →
            </button>
          </form>
          
          <p className="text-center text-[#A24A32] text-base font-bold mt-8">
            {isRegister ? 'Already have an account? ' : 'New here? '}
            <span 
              className="underline cursor-pointer hover:text-[#8e3f29]"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? 'Log in' : 'Create an account'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
