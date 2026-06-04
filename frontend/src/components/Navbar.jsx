import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, PlusCircle, Link2, User as UserIcon, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setMobileMenuOpen(false);
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const isDashboard = location.pathname === '/dashboard';
  const isLinksSection =
    location.pathname === '/links' || location.pathname.startsWith('/analytics');

  return (
    <nav className={`sticky top-0 z-50 w-full py-2.5 sm:py-3 ${
      user 
        ? 'border-b border-white/5 bg-slate-950/85 backdrop-blur-md px-4 sm:px-6 lg:px-8 shadow-lg' 
        : 'bg-transparent px-4'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        
        {/* Left Placeholder for Grid Balance when logged out */}
        {!user && <div className="w-6 h-6 sm:hidden" />}

        {/* Clean, Larger Text-Only Brand Identity Heading */}
        <Link 
          to="/" 
          className={`outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 rounded-lg ${
            !user ? 'mx-auto' : ''
          }`}
          onClick={() => setMobileMenuOpen(false)}
        >
          <span className="text-gradient-accent text-2xl sm:text-3xl font-heading font-black tracking-wide uppercase">
            ZipLink
          </span>
        </Link>

        {/* Protected Navigation Links Matrix */}
        {user && (
          <>
            {/* Desktop Controls */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/dashboard"
                className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-lg outline-none transition-colors duration-200 ${
                  isDashboard ? 'nav-tab-active' : 'nav-tab-inactive'
                }`}
              >
                <PlusCircle className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/links"
                className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-lg outline-none transition-colors duration-200 ${
                  isLinksSection ? 'nav-tab-active' : 'nav-tab-inactive'
                }`}
              >
                <Link2 className="w-4 h-4" />
                <span>My Links</span>
              </Link>

              <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                <UserIcon className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-xs font-bold text-slate-300">{user.username}</span>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-rose-400 bg-white/5 hover:bg-rose-500/10 border border-white/5 hover:border-rose-500/20 px-3.5 py-1.5 rounded-lg transition-all duration-150 outline-none cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>

            {/* Mobile Hamburger Trigger */}
            <div className="flex md:hidden">
              <button
                type="button"
                onClick={toggleMobileMenu}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors duration-150 outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Adaptive Flyout Drawer */}
            {mobileMenuOpen && (
              <div className="absolute top-[130%] left-0 right-0 cyber-panel border border-white/5 bg-slate-950/95 rounded-xl p-4 flex flex-col gap-3 shadow-lg md:hidden">
                <div className="flex items-center justify-between bg-white/5 px-4 py-2.5 rounded-lg border border-white/5 mb-1">
                  <div className="flex items-center gap-2">
                    <UserIcon className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-semibold text-slate-200">{user.username}</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase font-mono tracking-wider">Active</span>
                </div>

                {/* Mobile Create link */}
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-200 ${
                    isDashboard ? 'nav-tab-active' : 'nav-tab-inactive'
                  }`}
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>

                <Link
                  to="/links"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-200 ${
                    isLinksSection ? 'nav-tab-active' : 'nav-tab-inactive'
                  }`}
                >
                  <Link2 className="w-4 h-4" />
                  <span>My Links</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 font-bold text-sm text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 py-2.5 rounded-lg transition-all duration-150 cursor-pointer mt-1"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
