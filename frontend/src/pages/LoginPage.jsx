import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import ErrorMessage from '../components/ErrorMessage';
import { authAPI } from '../services/api';
import { Mail, Lock, LogIn, Link2 } from 'lucide-react';

const LoginPage = () => {
  const { login } = useAuth();
  const showToast = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await authAPI.login(formData);
      const { token, user } = response.data;
      
      login(token, user);
      showToast(`Access granted. Welcome back, ${user.username}!`, 'success');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || 
        err.response?.data?.errors?.[0]?.msg || 
        'Failed to establish link connection with secure auth servers.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center px-4 py-6">
      <div className="text-center mb-5">
        <div className="inline-flex bg-gradient-to-br from-cyan-400 to-indigo-500 p-3 rounded-2xl shadow-lg mb-3">
          <Link2 className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-xl sm:text-2xl font-heading font-extrabold tracking-tight text-slate-100">
          Welcome Back
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1.5 max-w-sm mx-auto leading-relaxed">
          Log in to access your secure short link redirection metrics.
        </p>
      </div>

      {/* Fixed Compact Glass Form Card */}
      <div className="section-panel w-full max-w-md !p-6 sm:!p-7">
        
        {error && (
          <div className="mb-4 animate-fade-in">
            <ErrorMessage message={error} />
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          
          {/* Email Address Section */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400" htmlFor="email">
              Email Address
            </label>
            <div className="relative flex items-center group">
              <Mail className="w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors absolute left-4 pointer-events-none" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="new-password"
                className="input-field pl-11"
              />
            </div>
          </div>

          {/* Password Section */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400" htmlFor="password">
              Password
            </label>
            <div className="relative flex items-center group">
              <Lock className="w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors absolute left-4 pointer-events-none" />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
                className="input-field pl-11"
              />
            </div>
          </div>

          {/* Sign In Execution Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary mt-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-400 border-t-white rounded-full animate-spin" />
                <span>Authorizing Credentials...</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        {/* Form Meta Footer Redirect */}
        <div className="text-center mt-6 text-xs text-slate-400 font-medium">
          Don't have an access node yet?{' '}
          <Link to="/signup" className="text-cyan-400 hover:text-cyan-300 font-bold ml-1 outline-none transition-colors">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
