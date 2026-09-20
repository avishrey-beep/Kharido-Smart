import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import TopBar from './components/TopBar';
import BottomNav from './components/BottomNav';
import ChatbotFab from './components/ChatbotFab';
import Home from './pages/Home';
import ShoppingList from './pages/ShoppingList';
import Markets from './pages/Markets';
import Login from './pages/Login';

// A wrapper for the main application shell
function AppLayout() {
  const navigate = useNavigate();
  
  // Protect routes
  useEffect(() => {
    const user = localStorage.getItem('kharido_user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="flex flex-col h-full w-full relative">
      <TopBar />
      
      <main className="flex-1 overflow-y-auto pb-20 pt-16 h-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shopping" element={<ShoppingList />} />
          <Route path="/markets" element={<Markets />} />
        </Routes>
      </main>
      
      <ChatbotFab />
      <BottomNav />
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="w-full h-screen haatpata-bg overflow-hidden relative flex flex-col">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<AppLayout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
