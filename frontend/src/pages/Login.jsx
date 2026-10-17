import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertTriangle, 
  Store, 
  MapPin, 
  Sparkles, 
  UserPlus, 
  LogIn, 
  ShieldCheck 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="absolute top-16 left-0 right-0 h-10 overflow-hidden z-10 pointer-events-none opacity-80">
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

const POPULAR_VILLAGES = [
  'Sadar Village', 
  'Kalyanpur', 
  'Mangalwar Haat', 
  'Rampur'
];

export default function Login() {
  // Requirement: Default to Create Account first
  const [isRegister, setIsRegister] = useState(true);
  
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rewritePassword, setRewritePassword] = useState('');
  const [village, setVillage] = useState('Sadar Village');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showRewritePassword, setShowRewritePassword] = useState(false);
  
  const [phoneError, setPhoneError] = useState('');
  const [formError, setFormError] = useState('');
  
  const navigate = useNavigate();

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, ''); // Numbers only
    setPhone(val);
    if (val.length > 10) {
      setPhoneError("Fault: You have to write 10 digits only");
    } else {
      setPhoneError("");
    }
  };

  const handleGoogleLogin = () => {
    // Seamless Google sign-in option
    const googleUser = {
      phone: 'GoogleVerified',
      name: 'Google User',
      village: village || 'Sadar Village',
      authMethod: 'google',
      isLoggedIn: true
    };
    localStorage.setItem('kharido_user', JSON.stringify(googleUser));
    navigate('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    // Phone validation
    if (!phone || phone.length !== 10) {
      setPhoneError("Fault: You have to write 10 digits only");
      return;
    }

    if (!password) {
      setFormError("Kripya apna password darj karein. (Please enter your password)");
      return;
    }

    if (password.length < 4) {
      setFormError("Password kam se kam 4 aksharon ka hona chahiye. (Password must be at least 4 characters)");
      return;
    }

    // In Register mode: validate two password fields
    if (isRegister) {
      if (!rewritePassword) {
        setFormError("Kripya password dobara likhein. (Please rewrite your password to confirm)");
        return;
      }
      if (password !== rewritePassword) {
        setFormError("Dono password ek jaise hone chahiye. (Passwords do not match)");
        return;
      }
    }

    // Store user session
    localStorage.setItem('kharido_user', JSON.stringify({ 
      phone, 
      village: village.trim() || 'Sadar Village',
      authMethod: 'credentials'
    }));

    navigate('/');
  };

  const isPasswordMatch = isRegister && password && rewritePassword && password === rewritePassword;
  const isPasswordMismatch = isRegister && password && rewritePassword && password !== rewritePassword;

  return (
    <div className="min-h-screen w-full relative z-20 bg-[#F5EFE0] overflow-y-auto">
      {/* Background Particles & Bunting */}
      <Particles />
      <Bunting />

      {/* ============================================================== */}
      {/* ALWAYS VISIBLE TOP BAR ("My Haat / मेरा हाट" Thing on Mobile) */}
      {/* ============================================================== */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#FBF6EA]/95 backdrop-blur-md border-b-[3px] border-[#2B2118] flex items-center justify-between px-4 sm:px-6 z-50 shadow-[0_4px_0_rgba(43,33,24,0.08)]">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-[#E3A83B] border-2 border-[#2B2118] flex items-center justify-center shadow-[1px_1px_0_#2B2118] shrink-0">
            <Store size={20} className="text-[#2B2118]" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl sm:text-2xl text-[#A24A32] leading-none font-bold" style={{ fontFamily: "'Yatra One', cursive" }}>
              KharidoSmart
            </h1>
            <span className="text-[11px] sm:text-xs text-[#5B4E3E] font-extrabold flex items-center gap-1 mt-0.5">
              <span className="text-[#4B6142]">●</span> मेरा हाट • My Haat Portal
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-[#EADFC7] border-2 border-[#2B2118] px-2.5 py-1 rounded-xl shadow-[1px_1px_0_#2B2118] flex items-center gap-1.5 text-xs font-black text-[#2B2118]">
            <MapPin size={13} className="text-[#A24A32]" />
            <span className="truncate max-w-[110px] sm:max-w-xs">{village || 'Sadar Haat'}</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="relative z-30 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 w-full max-w-6xl mx-auto pt-24 pb-16 px-4 sm:px-6">
        
        {/* Left Column: Hero & Stall ("Where's the haat today?") */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1 max-w-lg">
          <div className="w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[340px] mx-auto lg:mx-0">
            <StallSVG />
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl text-[#2B2118] leading-none mt-4 drop-shadow-sm font-bold" style={{ fontFamily: "'Yatra One', cursive" }}>
            Where's the haat<br />today?
          </h2>
          
          <div className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#A24A32] mt-1 bg-[#EADFC7] px-3 py-1 rounded-md border border-[#2B2118] inline-block shadow-sm">
            आज हाट कहाँ है? • My Haat Discovery
          </div>

          <svg className="w-3/4 max-w-[200px] lg:max-w-[280px] h-3.5 mt-2 mb-4 mx-auto lg:mx-0" viewBox="0 0 200 16" preserveAspectRatio="none">
            <path d="M2 11 C 40 2, 80 15, 120 7 S 180 2, 198 9" fill="none" stroke="#E3A83B" strokeWidth="4" strokeLinecap="round"/>
          </svg>
          
          {/* Taglines */}
          <p className="text-[#A24A32] text-xl sm:text-2xl font-black mb-2" style={{ textShadow: '0 0 12px rgba(227,168,59,0.3)' }}>
            अपने बाज़ार को जानिए, सही दाम पर खरीदिए।
          </p>
          <p className="text-[#5B4E3E] text-sm sm:text-base font-semibold mb-6 max-w-md mx-auto lg:mx-0">
            Compare real-time prices across 55+ rural mandis, discover weekly haats, and never overpay again.
          </p>

          {/* Feature Highlights */}
          <div className="bg-[#FBF6EA] border-[3px] border-[#2B2118] rounded-2xl p-4 sm:p-5 shadow-[5px_5px_0_#2B2118] w-full text-left">
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <span className="text-[#A24A32] font-black text-lg leading-none mt-0.5">✓</span>
                <div className="text-xs sm:text-sm text-[#2B2118] leading-snug">
                  <span className="font-black">Smart Comparison:</span> Instantly find the cheapest mandi including travel fare.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#E3A83B] font-black text-lg leading-none mt-0.5">✓</span>
                <div className="text-xs sm:text-sm text-[#2B2118] leading-snug">
                  <span className="font-black">Live Availability:</span> Know if weekly haats are open before traveling.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#4B6142] font-black text-lg leading-none mt-0.5">✓</span>
                <div className="text-xs sm:text-sm text-[#2B2118] leading-snug">
                  <span className="font-black">Bazaar Saathi AI:</span> Bilingual voice & text chatbot for village rates.
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Ticket Form (Create Account / Login) */}
        <div className="w-full max-w-[420px] bg-[#FBF6EA] rounded-2xl shadow-[6px_6px_0_#2B2118] p-6 sm:p-8 pt-8 relative border-[3px] border-[#2B2118] shrink-0">
          
          {/* Decorative Tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#EADFC7] border border-[#2B2118] opacity-90 transform -rotate-2 rounded-sm shadow-sm"></div>

          {/* Mode Switcher Tabs: Create Account (First) vs Log In */}
          <div className="grid grid-cols-2 gap-2 mb-6 bg-[#EADFC7] p-1.5 rounded-xl border-2 border-[#2B2118]">
            <button
              type="button"
              onClick={() => { setIsRegister(true); setFormError(''); }}
              className={`py-2 px-3 rounded-lg font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all ${
                isRegister 
                  ? 'bg-[#2B2118] text-[#FBF6EA] shadow-[2px_2px_0_#A24A32]' 
                  : 'text-[#2B2118] hover:bg-white/50'
              }`}
            >
              <UserPlus size={16} /> Create Account
            </button>
            <button
              type="button"
              onClick={() => { setIsRegister(false); setFormError(''); }}
              className={`py-2 px-3 rounded-lg font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all ${
                !isRegister 
                  ? 'bg-[#2B2118] text-[#FBF6EA] shadow-[2px_2px_0_#A24A32]' 
                  : 'text-[#2B2118] hover:bg-white/50'
              }`}
            >
              <LogIn size={16} /> Log In
            </button>
          </div>

          <div className="text-center space-y-1 mb-5">
            <h3 className="text-2xl sm:text-3xl text-[#2B2118] font-bold" style={{ fontFamily: "'Yatra One', cursive" }}>
              {isRegister ? 'Join the Bazaar' : 'Enter the Bazaar'}
            </h3>
            <p className="text-[#5B4E3E] text-xs sm:text-sm font-semibold">
              {isRegister 
                ? 'Pehle apna naya account banayein (Create your account first):' 
                : 'Apne mobile number se login karein (Log in with credentials):'}
            </p>
          </div>

          {/* Option: Login from Google */}
          <div className="mb-4">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full bg-white hover:bg-gray-50 text-[#2B2118] font-black py-3 px-4 rounded-xl border-2 border-[#2B2118] shadow-[3px_3px_0_#2B2118] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center justify-center gap-2.5 text-xs sm:text-sm"
            >
              {/* Official Google G Logo SVG */}
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Continue with Google (गूगल से लॉगिन)</span>
            </button>

            <div className="flex items-center my-4">
              <div className="flex-1 border-t-2 border-[#D9C9A3]"></div>
              <span className="px-3 text-[11px] font-black uppercase tracking-wider text-[#7D6B56] bg-[#FBF6EA]">
                OR WITH PHONE
              </span>
              <div className="flex-1 border-t-2 border-[#D9C9A3]"></div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Phone Number Field (with 10-digit fault rule) */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-[#5B4E3E] text-xs font-black uppercase tracking-wider">
                  Mobile Number (मोबाइल नंबर)
                </label>
                {phone.length > 0 && (
                  <span className={`text-[11px] font-bold ${phone.length > 10 ? 'text-red-600 font-black' : phone.length === 10 ? 'text-green-700 font-black' : 'text-[#5B4E3E]'}`}>
                    {phone.length}/10 {phone.length > 10 && '⚠️ Exceeded!'}
                  </span>
                )}
              </div>
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="10 digit phone number (e.g. 9876543210)"
                className={`w-full px-3.5 py-3 bg-white border-2 rounded-xl focus:outline-none text-[#2B2118] font-bold placeholder-[#A69780] text-base shadow-[2px_2px_0_#2B2118] transition-colors ${
                  phoneError || phone.length > 10
                    ? 'border-red-500 bg-red-50/50 focus:border-red-600'
                    : 'border-[#2B2118] focus:border-[#E3A83B]'
                }`}
              />
              {phoneError && (
                <p className="text-red-600 text-xs font-black mt-1 flex items-center gap-1.5 bg-red-100 p-2 rounded-lg border border-red-300 shadow-sm animate-pulse">
                  <span>⚠️</span>
                  <span>{phoneError}</span>
                </p>
              )}
            </div>

            {/* Village Selector (Shown in Create Account) */}
            {isRegister && (
              <div className="space-y-1">
                <label className="text-[#5B4E3E] text-xs font-black uppercase tracking-wider">
                  Village Name (गाँव का नाम)
                </label>
                <input
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  placeholder="e.g. Sadar Village"
                  className="w-full px-3.5 py-3 bg-white border-2 border-[#2B2118] rounded-xl focus:outline-none focus:border-[#E3A83B] text-[#2B2118] font-bold placeholder-[#A69780] text-base shadow-[2px_2px_0_#2B2118]"
                />
                <div className="flex flex-wrap gap-1 mt-1">
                  {POPULAR_VILLAGES.map((v, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setVillage(v)}
                      className="text-[10px] font-bold bg-[#EADFC7] hover:bg-[#dfd1b5] text-[#2B2118] px-2 py-0.5 rounded border border-[#2B2118]/40"
                    >
                      +{v}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TWO PASSWORD COLUMNS IN CREATE ACCOUNT */}
            {isRegister ? (
              <div className="space-y-3 pt-1">
                
                {/* Column 1: New Password */}
                <div className="space-y-1">
                  <label className="text-[#5B4E3E] text-xs font-black uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheck size={14} className="text-[#A24A32]" />
                    1. New Password (नया पासवर्ड)
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password..."
                      className="w-full px-3.5 py-3 pr-10 bg-white border-2 border-[#2B2118] rounded-xl focus:outline-none focus:border-[#E3A83B] text-[#2B2118] font-bold placeholder-[#A69780] text-base shadow-[2px_2px_0_#2B2118]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(prev => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5B4E3E] hover:text-[#2B2118]"
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Column 2: Rewrite / Confirm Password */}
                <div className="space-y-1">
                  <label className="text-[#5B4E3E] text-xs font-black uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheck size={14} className="text-[#4B6142]" />
                    2. Rewrite Password (पासवर्ड दोबारा लिखें)
                  </label>
                  <div className="relative">
                    <input
                      type={showRewritePassword ? 'text' : 'password'}
                      value={rewritePassword}
                      onChange={(e) => setRewritePassword(e.target.value)}
                      placeholder="Rewrite password to confirm..."
                      className={`w-full px-3.5 py-3 pr-10 bg-white border-2 rounded-xl focus:outline-none text-[#2B2118] font-bold placeholder-[#A69780] text-base shadow-[2px_2px_0_#2B2118] transition-colors ${
                        isPasswordMismatch 
                          ? 'border-red-500 bg-red-50/50' 
                          : isPasswordMatch 
                          ? 'border-green-600 bg-green-50/30' 
                          : 'border-[#2B2118] focus:border-[#E3A83B]'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowRewritePassword(prev => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5B4E3E] hover:text-[#2B2118]"
                      title={showRewritePassword ? "Hide password" : "Show password"}
                    >
                      {showRewritePassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {/* Real-time Match Indicator */}
                  {isPasswordMatch && (
                    <p className="text-green-700 text-xs font-black flex items-center gap-1 mt-1 bg-green-100 p-1.5 rounded-lg border border-green-300">
                      <CheckCircle2 size={14} /> Passwords match (दोनों पासवर्ड एक जैसे हैं)
                    </p>
                  )}
                  {isPasswordMismatch && (
                    <p className="text-red-600 text-xs font-black flex items-center gap-1 mt-1 bg-red-100 p-1.5 rounded-lg border border-red-300">
                      <AlertTriangle size={14} /> Passwords do not match (दोनों पासवर्ड अलग हैं)
                    </p>
                  )}
                </div>

              </div>
            ) : (
              /* Single Password in Log In mode */
              <div className="space-y-1">
                <label className="text-[#5B4E3E] text-xs font-black uppercase tracking-wider">
                  Password (पासवर्ड)
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password..."
                    className="w-full px-3.5 py-3 pr-10 bg-white border-2 border-[#2B2118] rounded-xl focus:outline-none focus:border-[#E3A83B] text-[#2B2118] font-bold placeholder-[#A69780] text-base shadow-[2px_2px_0_#2B2118]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5B4E3E] hover:text-[#2B2118]"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            )}

            {/* General Form Error Notice */}
            {formError && (
              <div className="bg-red-100 border-2 border-red-500 text-red-700 p-2.5 rounded-xl text-xs font-black flex items-center gap-2">
                <AlertTriangle size={16} className="shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#A24A32] hover:bg-[#8e3f29] text-[#FBF6EA] font-black py-4 rounded-xl border-[3px] border-[#2B2118] shadow-[4px_4px_0_#2B2118] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all text-lg mt-3 flex items-center justify-center gap-2"
            >
              {isRegister ? (
                <>
                  <UserPlus size={20} strokeWidth={2.5} />
                  <span>Create Account & Enter Bazaar</span>
                </>
              ) : (
                <>
                  <LogIn size={20} strokeWidth={2.5} />
                  <span>Log In to Bazaar</span>
                </>
              )}
            </button>
          </form>
          
          {/* Bottom Switcher Link */}
          <div className="text-center text-[#5B4E3E] text-xs sm:text-sm font-bold mt-5 pt-3 border-t-2 border-[#D9C9A3]/60">
            {isRegister ? 'Already have an account? (पहले से खाता है?) ' : 'New to KharidoSmart? (नया खाता बनाना है?) '}
            <button 
              type="button"
              className="text-[#A24A32] font-black underline hover:text-[#8e3f29] ml-1"
              onClick={() => { setIsRegister(!isRegister); setFormError(''); }}
            >
              {isRegister ? 'Log In here' : 'Create an Account'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
