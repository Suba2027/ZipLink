import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Lock, ShieldAlert, KeyRound, Eye, EyeOff, ArrowRight } from 'lucide-react';

const RedirectGatewayPage = () => {
  const { shortCode } = useParams();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/redirect/${shortCode}/verify`, { password });
      if (response.data.valid && response.data.originalUrl) {
        window.location.href = response.data.originalUrl;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Access verification failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080810] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Neon Glow Vectors */}
      <div className="absolute w-[300px] h-[300px] rounded-full bg-indigo-500/10 blur-lg top-1/4 left-1/4 pointer-events-none" />
      <div className="absolute w-[240px] h-[240px] rounded-full bg-cyan-500/10 blur-lg bottom-1/4 right-1/4 pointer-events-none" />
      
      <div className="w-full max-w-md bg-[#10101f]/65 backdrop-blur-md border border-white/5 p-8 rounded-2xl shadow-lg relative z-10 text-center">
        <div className="w-14 h-14 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl flex items-center justify-center mx-auto mb-5 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
          <Lock className="w-6 h-6" />
        </div>

        <h1 className="text-2xl font-bold font-heading text-white tracking-wide uppercase mb-2">
          Secure Pathway Locked
        </h1>
        <p className="text-sm text-slate-400 mb-6">
          This routing node requires configuration authorization credentials. Enter access code to proceed.
        </p>

        <form onSubmit={handleVerify} className="space-y-4 text-left">
          <div>
            <div className="relative">
              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Enter link password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3 bg-[#080810]/60 border border-white/20 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 p-3 rounded-lg animate-slide-in">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-indigo-500/10 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
          >
            {isLoading ? 'Verifying Cipher...' : 'Authorize Redirection'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default RedirectGatewayPage;
