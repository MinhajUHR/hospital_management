import React, { useState } from 'react';
import { Lock, User, KeyRound, ChevronRight, Facebook, Linkedin } from 'lucide-react';

interface AuthenticationProps {
  onLogin: () => void;
}

export default function Authentication({ onLogin }: AuthenticationProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'password') {
      onLogin();
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#27263b] to-[#776BCC] animate-gradient">
      <div className="relative bg-gradient-to-r from-[#373261] to-[#7C78B8] h-[600px] w-[360px] rounded-lg shadow-2xl overflow-hidden">
        {/* Content */}
        <div className="relative z-10 h-full">
          <h2 className="text-2xl font-bold text-white text-center mt-8 uppercase tracking-wider animate-glow">
            Hospital Management System
          </h2>

          <form onSubmit={handleSubmit} className="mt-32 px-8 space-y-6">
            <div className="relative">
              <User className="absolute top-3 left-0 h-5 w-5 text-[#7875B5]" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-8 pr-4 py-2 bg-white border-b-2 border-[#D1D1D4] text-black font-semibold focus:outline-none focus:border-[#ffcc00] transition-colors rounded"
                placeholder="Username / Email"
              />
            </div>

            <div className="relative">
              <KeyRound className="absolute top-3 left-0 h-5 w-5 text-[#7875B5]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-8 pr-4 py-2 bg-white border-b-2 border-[#D1D1D4] text-black font-semibold focus:outline-none focus:border-[#ffcc00] transition-colors rounded"
                placeholder="Password"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-white rounded-full py-4 px-6 flex items-center justify-center space-x-2 text-[#4C489D] font-bold uppercase tracking-wider shadow-lg transform hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
            >
              <span>Log In Now</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </form>

          <div className="absolute bottom-8 right-8 text-center text-white">
            <p className="text-sm mb-4">log in via</p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-white hover:scale-125 transition-transform duration-200">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-white hover:scale-125 transition-transform duration-200">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Animated Background Shapes */}
        <div className="absolute inset-0">
          <div className="absolute -top-12 right-32 h-[520px] w-[520px] bg-[#dbd7d7] rounded-tr-[72px] transform rotate-45 animate-float-1"></div>
          <div className="absolute -top-44 right-0 h-[220px] w-[220px] bg-[#6C63AC] rounded-[32px] transform rotate-45 animate-float-2"></div>
          <div className="absolute -top-6 right-0 h-[540px] w-[190px] bg-gradient-to-b from-[#5D54A4] to-[#6A679E] rounded-[32px] transform rotate-45 animate-float-3"></div>
          <div className="absolute top-[420px] right-12 h-[400px] w-[200px] bg-[#7E7BB9] rounded-[60px] transform rotate-45 animate-float-4"></div>
        </div>
      </div>
    </div>
  );
}