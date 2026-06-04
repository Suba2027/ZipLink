// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import AuthLayout from '../components/AuthLayout';
// import ErrorMessage from '../components/ErrorMessage';
// import { authAPI } from '../services/api';
// import { User, Mail, Lock, UserPlus } from 'lucide-react';

// const SignupPage = ({ onLoginSuccess }) => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ username: '', email: '', password: '' });
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

//     // Basic frontend validations
//     if (formData.username.trim().length < 3) {
//       setError('Username must be at least 3 characters long');
//       setLoading(false);
//       return;
//     }
//     if (formData.password.length < 6) {
//       setError('Password must be at least 6 characters long');
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await authAPI.signup(formData);
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
//     <AuthLayout title="Create Account" subtitle="Sign up to start shortening links instantly">
//       <ErrorMessage message={error} />
      
//       <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//         <div className="form-group">
//           <label className="form-label" htmlFor="username">Username</label>
//           <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
//             <User size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px' }} />
//             <input
//               type="text"
//               id="username"
//               name="username"
//               className="form-input"
//               placeholder="johndoe"
//               value={formData.username}
//               onChange={handleChange}
//               required
//               style={{ width: '100%', paddingLeft: '44px' }}
//             />
//           </div>
//         </div>

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
//               placeholder="•••••••• (Min 6 chars)"
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
//               Creating Account...
//             </span>
//           ) : (
//             <>
//               <UserPlus size={18} />
//               <span>Create Account</span>
//             </>
//           )}
//         </button>
//       </form>

//       <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
//         Already have an account?{' '}
//         <Link to="/login" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>
//           Sign In
//         </Link>
//       </div>
//     </AuthLayout>
//   );
// };

// export default SignupPage;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import ErrorMessage from '../components/ErrorMessage';
import { authAPI } from '../services/api';
import { User, Mail, Lock, UserPlus, Link2 } from 'lucide-react';

const SignupPage = () => {
  const { login } = useAuth();
  const showToast = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
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

    // Frontend validation gate check
    if (formData.username.trim().length < 3) {
      setError('Username must be at least 3 characters long');
      setLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.signup(formData);
      const { token, user } = response.data;
      
      // Inject token and user data into our shared AuthContext session manager
      login(token, user);
      
      showToast('Registration successful! Secure node activated.', 'success');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || 
        err.response?.data?.errors?.[0]?.msg || 
        'Failed to connect to the authentication server.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto my-4 sm:my-6">
      {/* Decorative Branding */}
      <div className="text-center mb-6">
        <div className="inline-flex bg-gradient-to-br from-cyan-500 to-indigo-600 p-2.5 rounded-xl shadow-[0_0_20px_rgba(99,102,241,0.2)] mb-3">
          <Link2 className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl font-heading font-extrabold tracking-tight text-slate-100">
          Create Account
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Register to begin shortening and analyzing links instantly.
        </p>
      </div>

      {/* Cyberpunk Core Glass Panel Frame */}
      <div className="section-panel !p-6 sm:!p-7">
        {error && (
          <div className="mb-4 animate-fade-in">
            <ErrorMessage message={error} />
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Input Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400" htmlFor="username">
              Username
            </label>
            <div className="relative flex items-center group">
              <User className="w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors absolute left-4 pointer-events-none" />
              <input
                type="text"
                id="username"
                name="username"
                placeholder="enter your name"
                value={formData.username}
                onChange={handleChange}
                required
                autoComplete="new-username"
                className="input-field pl-11"
              />
            </div>
          </div>

          {/* Email Address Input Field */}
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
                autoComplete="new-email"
                className="input-field pl-11"
              />
            </div>
          </div>

          {/* Password Input Field */}
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
                placeholder="•••••••• (Min 6 characters)"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
                className="input-field pl-11"
              />
            </div>
          </div>

          {/* Submit Action Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary mt-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-400 border-t-white rounded-full animate-spin" />
                <span>Registering Account Data...</span>
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Create Account</span>
              </>
            )}
          </button>
        </form>

        {/* Alternate Navigation Footer */}
        <div className="text-center mt-6 text-xs text-slate-400 font-medium">
          Already have an operational account?{' '}
          <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-bold ml-0.5 outline-none transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
