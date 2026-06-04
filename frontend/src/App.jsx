
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './context/AuthContext';
// import { ToastProvider } from './context/ToastContext';
// import Navbar from './components/Navbar';
// import ProtectedRoute from './components/ProtectedRoute';
// import LoginPage from './pages/LoginPage';
// import SignupPage from './pages/SignupPage';
// import DashboardPage from './pages/DashboardPage';
// import AnalyticsPage from './pages/AnalyticsPage';
// import LoadingSpinner from './components/LoadingSpinner';
// import LinksListPage from './pages/LinksListPage'; 

// function AppShell() {
//   const { token, user, logout, initializing } = useAuth();

//   // Fullscreen responsive layout spinner using Tailwind CSS utility styles
//   if (initializing) {
//     return (
//       <div className="flex min-h-[100dvh] w-full items-center justify-center bg-slate-900">
//         <LoadingSpinner size="large" />
//       </div>
//     );
//   }

//   return (
//     <div className="relative min-h-screen flex flex-col bg-slate-900 text-slate-100 overflow-x-hidden antialiased">
      
//       {/* Visual background ambient blurs */}
//       <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
//       <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />

//       {/* Main Navigation Row */}
//       <Navbar user={user} onLogout={logout} />

//       {/* Content wrapper with built-in outer responsive gutters */}
//       <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 relative z-10">
//         <Routes>
//   {/* Guest-only routes */}
//   <Route path="/login"  element={!token ? <LoginPage />  : <Navigate to="/dashboard" replace />} />
//   <Route path="/signup" element={!token ? <SignupPage /> : <Navigate to="/dashboard" replace />} />

//   {/* Protected routes */}
//   <Route path="/dashboard"            element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
//   <Route path="/links"                element={<ProtectedRoute><LinksListPage /></ProtectedRoute>} />
//   <Route path="/analytics/:shortCode" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />

//   {/* Catch-all */}
//   <Route path="/" element={<Navigate to={token ? '/dashboard' : '/login'} replace />} />
//   <Route path="*" element={<Navigate to="/" replace />} />
// </Routes>

//       </main>
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <ToastProvider>
//         <Router>
//           <AppShell />
//         </Router>
//       </ToastProvider>
//     </AuthProvider>
//   );
// }
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import LoadingSpinner from './components/LoadingSpinner';
import LinksListPage from './pages/LinksListPage'; 
import RedirectGatewayPage from './pages/RedirectGatewayPage';

function AppShell() {
  const { token, user, logout, initializing } = useAuth();

  // Fullscreen responsive layout spinner using Tailwind CSS utility styles
  if (initializing) {
    return (
      <div className="flex min-h-[100dvh] w-full items-center justify-center bg-slate-900">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-900 text-slate-100 overflow-x-hidden antialiased">
      
      {/* Visual background ambient blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-indigo-500/10 blur-lg pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-emerald-500/10 blur-lg pointer-events-none" />

      {/* Main Navigation Row */}
      <Navbar user={user} onLogout={logout} />

      {/* Content wrapper with built-in outer responsive gutters */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 relative z-10">
        <Routes>
          {/* Guest-only routes */}
          <Route path="/login"  element={!token ? <LoginPage />  : <Navigate to="/dashboard" replace />} />
          <Route path="/signup" element={!token ? <SignupPage /> : <Navigate to="/dashboard" replace />} />

          {/* Protected routes */}
          <Route path="/dashboard"            element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/links"                element={<ProtectedRoute><LinksListPage /></ProtectedRoute>} />
          <Route path="/analytics/:shortCode" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />

          {/* ─── PUBLIC PASSWORD PROTECTION GATEWAY ─── */}
          {/* Kept outside ProtectedRoute so any visitor can access it to authenticate */}
          <Route path="/redirect-gateway/:shortCode" element={<RedirectGatewayPage />} />

          {/* Catch-all */}
          <Route path="/" element={<Navigate to={token ? '/dashboard' : '/login'} replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <AppShell />
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}
