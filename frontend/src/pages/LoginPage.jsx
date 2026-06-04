// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import AuthLayout from '../components/AuthLayout';
// import ErrorMessage from '../components/ErrorMessage';
// import { authAPI } from '../services/api';
// import { Mail, Lock, LogIn } from 'lucide-react';

// const LoginPage = ({ onLoginSuccess }) => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     if (error) setError(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await authAPI.login(formData);
//       const { token, user } = response.data;
      
//       // Store token and user
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(user));
      
//       // Update state in App
//       onLoginSuccess(token, user);
      
//       // Navigate to dashboard
//       navigate('/dashboard');
//     } catch (err) {
//       console.error(err);
//       setError(
//         err.response?.data?.message || 
//         err.response?.data?.errors?.[0]?.msg || 
//         'Failed to connect to the server'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AuthLayout title="Welcome Back" subtitle="Log in to manage your shortened links">
//       <ErrorMessage message={error} />
      
//       <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//         <div className="form-group">
//           <label className="form-label" htmlFor="email">Email Address</label>
//           <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
//             <Mail size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px' }} />
//             <input
//               type="email"
//               id="email"
//               name="email"
//               className="form-input"
//               placeholder="name@example.com"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               style={{ width: '100%', paddingLeft: '44px' }}
//             />
//           </div>
//         </div>

//         <div className="form-group">
//           <label className="form-label" htmlFor="password">Password</label>
//           <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
//             <Lock size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px' }} />
//             <input
//               type="password"
//               id="password"
//               name="password"
//               className="form-input"
//               placeholder="••••••••"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               style={{ width: '100%', paddingLeft: '44px' }}
//             />
//           </div>
//         </div>

//         <button 
//           type="submit" 
//           className="btn btn-primary" 
//           disabled={loading}
//           style={{ width: '100%', marginTop: '8px', padding: '14px 20px' }}
//         >
//           {loading ? (
//             <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//               <span className="spinner" style={{ width: '18px', height: '18px', borderWidth: '2px' }}></span>
//               Signing In...
//             </span>
//           ) : (
//             <>
//               <LogIn size={18} />
//               <span>Sign In</span>
//             </>
//           )}
//         </button>
//       </form>

//       <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
//         Don't have an account?{' '}
//         <Link to="/signup" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>
//           Create Account
//         </Link>
//       </div>
//     </AuthLayout>
//   );
// };

// export default LoginPage;
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { useToast } from '../context/ToastContext';
// import ErrorMessage from '../components/ErrorMessage';
// import { authAPI } from '../services/api';
// import { Mail, Lock, LogIn, Link2 } from 'lucide-react';

// const LoginPage = () => {
//   const { login } = useAuth();
//   const showToast = useToast();
//   const navigate = useNavigate();
  
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     if (error) setError(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await authAPI.login(formData);
//       const { token, user } = response.data;
      
//       // Commit profile vectors directly into centralized AuthContext state engine
//       login(token, user);
      
//       showToast(`Access granted. Welcome back, ${user.username}!`, 'success');
//       navigate('/dashboard');
//     } catch (err) {
//       console.error(err);
//       setError(
//         err.response?.data?.message || 
//         err.response?.data?.errors?.[0]?.msg || 
//         'Failed to establish link connection with secure auth servers.'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-md mx-auto my-8 sm:my-12 animate-slide-in">
//       {/* Decorative branding for independent viewport entries */}
//       <div className="text-center mb-6">
//         <div className="inline-flex bg-gradient-to-br from-cyan-500 to-indigo-600 p-2.5 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.2)] mb-3">
//           <Link2 className="w-6 h-6 text-white" />
//         </div>
//         <h1 className="text-2xl font-heading font-extrabold tracking-tight text-slate-100">
//           Welcome Back
//         </h1>
//         <p className="text-xs text-slate-400 mt-1">
//           Log in to access your secure short link redirection metrics.
//         </p>
//       </div>

//       {/* Cyber glass core panel frame */}
//       <div className="cyber-panel border border-white/5 bg-slate-900/40 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-2xl">
//         {/* Dynamic Warning Alert Bar */}
//         {error && (
//           <div className="mb-4 animate-fade-in">
//             <ErrorMessage message={error} />
//           </div>
//         )}
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Email Block */}
//           <div className="flex flex-col gap-1.5">
//             <label className="text-xs font-semibold uppercase tracking-wider text-slate-400" htmlFor="email">
//               Email Address
//             </label>
//             <div className="relative flex items-center group">
//               <Mail className="w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors absolute left-4 pointer-events-none" />
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 placeholder="name@example.com"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="w-full bg-slate-950 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-200 placeholder-slate-600 pl-11 pr-4 py-3 rounded-xl text-sm transition-all outline-none"
//               />
//             </div>
//           </div>

//           {/* Password Block */}
//           <div className="flex flex-col gap-1.5">
//             <label className="text-xs font-semibold uppercase tracking-wider text-slate-400" htmlFor="password">
//               Password
//             </label>
//             <div className="relative flex items-center group">
//               <Lock className="w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors absolute left-4 pointer-events-none" />
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 placeholder="••••••••"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 className="w-full bg-slate-950 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-200 placeholder-slate-600 pl-11 pr-4 py-3 rounded-xl text-sm transition-all outline-none"
//               />
//             </div>
//           </div>

//           {/* Core Entry Dispatcher Button */}
//           <button 
//             type="submit" 
//             disabled={loading}
//             className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-semibold text-sm py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-2 outline-none active:scale-[0.99] mt-2"
//           >
//             {loading ? (
//               <>
//                 <div className="w-4 h-4 border-2 border-slate-400 border-t-white rounded-full animate-spin" />
//                 <span>Decrypting Profile...</span>
//               </>
//             ) : (
//               <>
//                 <LogIn className="w-4 h-4" />
//                 <span>Sign In</span>
//               </>
//             )}
//           </button>
//         </form>

//         {/* Alternate Navigation Footer */}
//         <div className="text-center mt-6 text-xs text-slate-400 font-medium">
//           Don't have an access node yet?{' '}
//           <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-bold ml-0.5 outline-none transition-colors">
//             Create Account
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
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
