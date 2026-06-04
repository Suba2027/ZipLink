// // import React, { useState, useEffect } from 'react';
// // import { useParams, Link, useNavigate } from 'react-router-dom';
// // import DashboardLayout from '../components/DashboardLayout';
// // import LoadingSpinner from '../components/LoadingSpinner';
// // import ErrorMessage from '../components/ErrorMessage';
// // import { urlAPI } from '../services/api';
// // import { formatDate, getShortLink, copyToClipboard } from '../utils/helpers';
// // import { ArrowLeft, ExternalLink, Calendar, MousePointerClick, Activity, Copy, Check, Info } from 'lucide-react';

// // const AnalyticsPage = () => {
// //   const { shortCode } = useParams();
// //   const navigate = useNavigate();
// //   const [urlData, setUrlData] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [copied, setCopied] = useState(false);

// //   useEffect(() => {
// //     fetchAnalytics();
// //   }, [shortCode]);

// //   const fetchAnalytics = async () => {
// //     setLoading(true);
// //     setError(null);
// //     try {
// //       const response = await urlAPI.getAnalytics(shortCode);
// //       setUrlData(response.data);
// //     } catch (err) {
// //       console.error(err);
// //       setError(
// //         err.response?.data?.message || 
// //         'Failed to fetch link analytics. Ensure you are authorized.'
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleCopy = async () => {
// //     if (!urlData) return;
// //     const shortLink = getShortLink(urlData.shortCode);
// //     const success = await copyToClipboard(shortLink);
// //     if (success) {
// //       setCopied(true);
// //       setTimeout(() => setCopied(false), 2000);
// //     }
// //   };

// //   if (loading) return <LoadingSpinner fullPage />;
// //   if (error) {
// //     return (
// //       <DashboardLayout>
// //         <Link to="/dashboard" style={{
// //           display: 'inline-flex',
// //           alignItems: 'center',
// //           gap: '8px',
// //           color: 'var(--text-secondary)',
// //           textDecoration: 'none',
// //           marginBottom: '24px',
// //           fontWeight: 500
// //         }}>
// //           <ArrowLeft size={16} />
// //           <span>Back to Dashboard</span>
// //         </Link>
// //         <ErrorMessage message={error} />
// //       </DashboardLayout>
// //     );
// //   }

// //   // Analytics Math & Chart Grouping
// //   const clicks = urlData.clicks || 0;
// //   const visits = urlData.visits || [];

// //   // Group visits by date (last 7 calendar days)
// //   const getChartData = () => {
// //     const data = [];
// //     const now = new Date();
    
// //     for (let i = 6; i >= 0; i--) {
// //       const d = new Date();
// //       d.setDate(now.getDate() - i);
// //       const dateStr = d.toDateString(); // "Tue Jun 02 2026"
      
// //       // Filter visits matching this day
// //       const count = visits.filter(v => {
// //         const visitDate = new Date(v.timestamp);
// //         return visitDate.toDateString() === dateStr;
// //       }).length;

// //       data.push({
// //         label: d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }),
// //         count
// //       });
// //     }
// //     return data;
// //   };

// //   const chartData = getChartData();
// //   const maxHits = Math.max(...chartData.map(d => d.count), 1); // Avoid division by zero

// //   return (
// //     <DashboardLayout>
// //       {/* Back Button */}
// //       <Link to="/dashboard" style={{
// //         display: 'inline-flex',
// //         alignItems: 'center',
// //         gap: '8px',
// //         color: 'var(--text-secondary)',
// //         textDecoration: 'none',
// //         marginBottom: '24px',
// //         fontWeight: 500,
// //         transition: 'color 0.2s'
// //       }} className="hover-primary">
// //         <ArrowLeft size={18} />
// //         <span>Back to Dashboard</span>
// //       </Link>

// //       {/* Main Title Banner */}
// //       <div className="glass-panel" style={{
// //         padding: '30px',
// //         marginBottom: '32px',
// //         border: '1px solid var(--glass-border)',
// //         background: 'rgba(16, 16, 31, 0.4)'
// //       }}>
// //         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
// //           <div>
// //             <h1 className="gradient-text-accent" style={{ fontSize: '2rem', marginBottom: '8px' }}>
// //               /{urlData.shortCode}
// //             </h1>
// //             <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '14px', wordBreak: 'break-all' }}>
// //               Destination: <a href={urlData.originalUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
// //                 {urlData.originalUrl} <ExternalLink size={12} style={{ display: 'inline', marginLeft: '4px' }} />
// //               </a>
// //             </p>
// //           </div>

// //           <div style={{ display: 'flex', gap: '10px' }}>
// //             <button className="btn btn-secondary" onClick={handleCopy} style={{ padding: '10px 16px', fontSize: '0.9rem' }}>
// //               {copied ? (
// //                 <>
// //                   <Check size={16} color="var(--color-success)" />
// //                   <span style={{ color: 'var(--color-success)' }}>Copied Link!</span>
// //                 </>
// //               ) : (
// //                 <>
// //                   <Copy size={16} />
// //                   <span>Copy Short URL</span>
// //                 </>
// //               )}
// //             </button>
// //             <a href={getShortLink(urlData.shortCode)} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '10px 16px', fontSize: '0.9rem' }}>
// //               <ExternalLink size={16} />
// //               <span>Visit Link</span>
// //             </a>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Quick Summary Widgets */}
// //       <div style={{
// //         display: 'grid',
// //         gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
// //         gap: '20px',
// //         marginBottom: '40px'
// //       }}>
// //         {/* Total Clicks Card */}
// //         <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
// //           <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '12px', borderRadius: '12px', color: 'var(--color-success)' }}>
// //             <MousePointerClick size={24} />
// //           </div>
// //           <div>
// //             <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
// //               Total Link Hits
// //             </div>
// //             <div style={{ fontSize: '1.8rem', fontWeight: 'bold', marginTop: '4px' }}>
// //               {clicks}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Date Created Card */}
// //         <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
// //           <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '12px', borderRadius: '12px', color: 'var(--color-primary)' }}>
// //             <Calendar size={24} />
// //           </div>
// //           <div>
// //             <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
// //               Date Shortened
// //             </div>
// //             <div style={{ fontSize: '1.1rem', fontWeight: '600', marginTop: '8px' }}>
// //               {formatDate(urlData.createdAt)}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Last Visit Card */}
// //         <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
// //           <div style={{ background: 'rgba(236, 72, 153, 0.1)', padding: '12px', borderRadius: '12px', color: 'var(--color-accent)' }}>
// //             <Activity size={24} />
// //           </div>
// //           <div>
// //             <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
// //               Last Active Hit
// //             </div>
// //             <div style={{ fontSize: '1.1rem', fontWeight: '600', marginTop: '8px' }}>
// //               {urlData.lastVisited ? formatDate(urlData.lastVisited) : 'No hits recorded'}
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Main Charts & Visit History Section */}
// //       <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
// //         {/* Visual Chart Panel */}
// //         <div className="glass-panel" style={{ padding: '30px' }}>
// //           <h3 style={{ fontSize: '1.2rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
// //             <Activity size={20} color="var(--color-primary)" />
// //             <span>Activity distribution (Last 7 Days)</span>
// //           </h3>

// //           {/* Bar Chart Canvas */}
// //           <div style={{
// //             display: 'flex',
// //             alignItems: 'flex-end',
// //             justifyContent: 'space-between',
// //             height: '240px',
// //             paddingTop: '20px',
// //             borderBottom: '1px solid var(--glass-border)',
// //             gap: '12px'
// //           }}>
// //             {chartData.map((day, idx) => {
// //               const pct = (day.count / maxHits) * 100;
// //               return (
// //                 <div key={idx} style={{
// //                   flex: 1,
// //                   display: 'flex',
// //                   flexDirection: 'column',
// //                   alignItems: 'center',
// //                   gap: '10px',
// //                   height: '100%',
// //                   justifyContent: 'flex-end'
// //                 }}>
// //                   {/* Bar Tooltip/Value */}
// //                   <span style={{
// //                     fontSize: '0.75rem',
// //                     color: day.count > 0 ? 'var(--color-secondary)' : 'var(--text-muted)',
// //                     fontWeight: 600,
// //                     marginBottom: '4px'
// //                   }}>
// //                     {day.count}
// //                   </span>

// //                   {/* Animated Column Bar */}
// //                   <div style={{
// //                     width: '100%',
// //                     maxWidth: '44px',
// //                     height: `${pct}%`,
// //                     minHeight: day.count > 0 ? '6px' : '0px',
// //                     background: day.count > 0 
// //                       ? 'linear-gradient(to top, var(--color-primary) 0%, var(--color-secondary) 100%)'
// //                       : 'rgba(255, 255, 255, 0.02)',
// //                     borderRadius: '6px 6px 0 0',
// //                     transition: 'height 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
// //                     boxShadow: day.count > 0 ? '0 0 15px rgba(6, 182, 212, 0.2)' : 'none'
// //                   }} />

// //                   {/* Date label */}
// //                   <span style={{
// //                     fontSize: '0.75rem',
// //                     color: 'var(--text-secondary)',
// //                     marginTop: '8px',
// //                     whiteSpace: 'nowrap'
// //                   }}>
// //                     {day.label}
// //                   </span>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         </div>

// //         {/* Audit Log (List of all visits) */}
// //         <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
// //           <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
// //             <Info size={20} color="var(--color-secondary)" />
// //             <span>Telemetry Audit Logs ({visits.length})</span>
// //           </h3>

// //           {visits.length > 0 ? (
// //             <div className="table-container" style={{ maxHeight: '300px', overflowY: 'auto' }}>
// //               <table className="custom-table">
// //                 <thead>
// //                   <tr>
// //                     <th>Visit Reference</th>
// //                     <th>Timestamp</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {[...visits].reverse().map((visit, idx) => (
// //                     <tr key={visit._id || idx}>
// //                       <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
// //                         Hit #{visits.length - idx}
// //                       </td>
// //                       <td style={{ fontWeight: 500 }}>
// //                         {formatDate(visit.timestamp)}
// //                       </td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           ) : (
// //             <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', borderStyle: 'dashed' }}>
// //               <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
// //                 No redirection activity recorded yet. Distribute your short link to collect hits.
// //               </p>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </DashboardLayout>
// //   );
// // };

// // export default AnalyticsPage;

// import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import LoadingSpinner from '../components/LoadingSpinner';
// import ErrorMessage from '../components/ErrorMessage';
// import { urlAPI } from '../services/api';
// import { formatDate, getShortLink, copyToClipboard } from '../utils/helpers';
// import { ArrowLeft, ExternalLink, Calendar, MousePointerClick, Activity, Copy, Check, Info, QrCode } from 'lucide-react'; 

// const AnalyticsPage = () => {
//   const { shortCode } = useParams();
//   const navigate = useNavigate();
//   const [urlData, setUrlData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [copied, setCopied] = useState(false);
// const [showQr, setShowQr] = useState(false);
//   useEffect(() => {
//     fetchAnalytics();
//   }, [shortCode]);

//   const fetchAnalytics = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await urlAPI.getAnalytics(shortCode);
//       setUrlData(response.data);
//     } catch (err) {
//       console.error(err);
//       setError(
//         err.response?.data?.message || 
//         'Failed to fetch link analytics. Ensure you are authorized.'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCopy = async () => {
//     if (!urlData) return;
//     const shortLink = getShortLink(urlData.shortCode);
//     const success = await copyToClipboard(shortLink);
//     if (success) {
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     }
//   };

//   if (loading) return <LoadingSpinner fullPage />;
  
//   if (error) {
//     return (
//       <div className="w-full max-w-4xl mx-auto space-y-4 animate-slide-in">
//         <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors duration-150 outline-none">
//           <ArrowLeft className="w-4 h-4" />
//           <span>Back to Dashboard</span>
//         </Link>
//         <ErrorMessage message={error} />
//       </div>
//     );
//   }

//   const clicks = urlData.clicks || 0;
//   const visits = urlData.visits || [];

//   // Group visits by date (last 7 calendar days)
//   const getChartData = () => {
//     const data = [];
//     const now = new Date();
    
//     for (let i = 6; i >= 0; i--) {
//       const d = new Date();
//       d.setDate(now.getDate() - i);
//       const dateStr = d.toDateString();
      
//       const count = visits.filter(v => {
//         const visitDate = new Date(v.timestamp);
//         return visitDate.toDateString() === dateStr;
//       }).length;

//       data.push({
//         label: d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }),
//         count
//       });
//     }
//     return data;
//   };

//   const chartData = getChartData();
//   const maxHits = Math.max(...chartData.map(d => d.count), 1);

//   return (
//     <div className="w-full max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-slide-in">
      
//       {/* Back Navigation Row */}
//       <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors duration-150 outline-none">
//         <ArrowLeft className="w-4 h-4" />
//         <span>Back to Dashboard</span>
//       </Link>

//       {/* Main Title Metadata Card with Integrated QR Code Trigger */}
//       <div className="cyber-panel p-5 sm:p-7 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-md shadow-lg relative">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
//           <div className="space-y-1">
//             <h1 className="text-3xl font-heading font-extrabold tracking-tight text-gradient-accent">
//               /{urlData.shortCode}
//             </h1>
//             <div className="text-xs text-slate-400 max-w-xl truncate">
//               Destination:{' '}
//               <a href={urlData.originalUrl} target="_blank" rel="noopener noreferrer" className="text-slate-200 hover:text-indigo-400 underline font-medium transition-colors outline-none ml-1 inline-flex items-center gap-1">
//                 <span>{urlData.originalUrl}</span>
//                 <ExternalLink className="w-3 h-3 shrink-0" />
//               </a>
//             </div>
//           </div>

//           {/* Action Callouts Row */}
//           <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto shrink-0 relative">
            
//             {/* Action 1: Copy Link */}
//             <button 
//               onClick={handleCopy} 
//               className={`flex-1 md:flex-initial text-xs font-semibold px-4 py-2.5 rounded-xl border transition-all flex items-center justify-center gap-2 outline-none cursor-pointer ${
//                 copied 
//                   ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
//                   : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
//               }`}
//             >
//               {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
//               <span>{copied ? 'Copied!' : 'Copy Short URL'}</span>
//             </button>

//             {/* BONUS Action 2: Interactive QR Code Popover Trigger */}
//             <div className="relative flex-1 md:flex-initial">
//               <button 
//                 onClick={() => setShowQr(!showQr)} 
//                 className={`w-full text-xs font-semibold px-4 py-2.5 rounded-xl border transition-all flex items-center justify-center gap-2 outline-none cursor-pointer ${
//                   showQr 
//                     ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
//                     : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
//                 }`}
//               >
//                 <QrCode className="w-4 h-4" />
//                 <span>QR Code</span>
//               </button>

//               {/* Dynamic Dropdown Floating QR Code Window Asset */}
//               {showQr && (
//                 <div className="absolute top-[125%] right-1/2 translate-x-1/2 md:translate-x-0 md:right-0 z-50 p-3 bg-slate-950 border border-white/10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.7)] animate-slide-in flex flex-col items-center gap-2 w-40">
//                   <div className="bg-white p-2 rounded-xl">
//                     <img 
//                       src={`https://qrserver.com{encodeURIComponent(getShortLink(urlData.shortCode))}`}
//                       alt="QR Code vector"
//                       className="w-28 h-28 object-contain select-none"
//                       loading="lazy"
//                     />
//                   </div>
//                   <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">Scan Gateway</span>
//                 </div>
//               )}
//             </div>

//             {/* Action 3: Visit Link */}
//             <a 
//               href={getShortLink(urlData.shortCode)} 
//               target="_blank" 
//               rel="noopener noreferrer" 
//               className="flex-1 md:flex-initial text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 px-4 py-2.5 rounded-xl text-center shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-2 outline-none"
//             >
//               <ExternalLink className="w-4 h-4" />
//               <span>Visit Link</span>
//             </a>

//           </div>
//         </div>
//       </div>


//       {/* Summary Stat Cards Panel */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
//         {/* Card 1: Total Clicks */}
//         <div className="cyber-panel p-5 rounded-2xl flex items-center gap-4 bg-slate-900/20 border border-white/5 shadow-xl">
//           <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl text-emerald-400 shrink-0">
//             <MousePointerClick className="w-5 h-5" />
//           </div>
//           <div>
//             <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Total Link Hits</span>
//             <span className="text-2xl font-heading font-extrabold text-slate-100 block mt-0.5">{clicks}</span>
//           </div>
//         </div>

//         {/* Card 2: Date Created */}
//         <div className="cyber-panel p-5 rounded-2xl flex items-center gap-4 bg-slate-900/20 border border-white/5 shadow-xl">
//           <div className="bg-indigo-500/10 border border-indigo-500/20 p-3 rounded-xl text-indigo-400 shrink-0">
//             <Calendar className="w-5 h-5" />
//           </div>
//           <div>
//             <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Date Shortened</span>
//             <span className="text-sm font-semibold text-slate-200 block mt-1.5">{formatDate(urlData.createdAt)}</span>
//           </div>
//         </div>

//         {/* Card 3: Last Visited Date */}
//         <div className="cyber-panel p-5 rounded-2xl flex items-center gap-4 bg-slate-900/20 border border-white/5 shadow-xl sm:col-span-2 lg:col-span-1">
//           <div className="bg-pink-500/10 border border-pink-500/20 p-3 rounded-xl text-pink-400 shrink-0">
//             <Activity className="w-5 h-5" />
//           </div>
//           <div>
//             <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Last Active Hit</span>
//             <span className="text-sm font-semibold text-slate-200 block mt-1.5">
//               {urlData.lastVisited ? formatDate(urlData.lastVisited) : 'No hits recorded'}
//             </span>
//           </div>
//         </div>
//       </div>

              
//       {/* Charts & Audit Database Splitting Layout Grid */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
//         {/* Left Side: Activity Distribution Graph Column */}
//         <div className="lg:col-span-2 cyber-panel p-5 sm:p-7 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-md shadow-lg w-full">
//           <h3 className="text-sm font-bold flex items-center gap-2 text-slate-200 mb-6 tracking-tight">
//             <Activity className="w-4 h-4 text-indigo-400" />
//             <span>Activity Distribution (Last 7 Days)</span>
//           </h3>

//           {/* Bar Chart Grid Core Content Area */}
//           <div className="flex items-end justify-between h-48 sm:h-56 pt-4 border-b border-white/5 gap-2 sm:gap-4 overflow-x-auto min-w-[280px] custom-scrollbar">
//             {chartData.map((day, idx) => {
//               const pct = (day.count / maxHits) * 100;
//               return (
//                 <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-flex-end group pb-1">
//                   {/* Tooltip counter text floating layer */}
//                   <span className={`text-[10px] font-bold transition-opacity ${day.count > 0 ? 'text-cyan-400' : 'text-slate-600'}`}>
//                     {day.count}
//                   </span>

//                   {/* Dynamic Height Vector Column Bar Block */}
//                   <div 
//                     style={{ height: `${pct}%` }}
//                     className={`w-full max-w-[36px] rounded-t-md transition-all duration-700 ease-out min-h-[2px] ${
//                       day.count > 0 
//                         ? 'bg-gradient-to-t from-indigo-600 to-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
//                         : 'bg-white/[0.02]'
//                     }`}
//                   />

//                   {/* Day Date bottom row marker strings */}
//                   <span className="text-[10px] font-semibold text-slate-500 whitespace-nowrap mt-1">
//                     {day.label}
//                   </span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//               {/* Right Side: Raw Telemetry Real-time Traffic Log Stream */}
//         <div className="lg:col-span-1 flex flex-col gap-4 w-full">
//           <h3 className="text-sm font-bold flex items-center gap-2 text-slate-200 tracking-tight">
//             <Info className="w-4 h-4 text-cyan-400" />
//             <span>Telemetry Audit Logs ({visits.length})</span>
//           </h3>

//           {visits.length > 0 ? (
//             <div className="w-full overflow-hidden rounded-xl border border-white/5 bg-slate-950/40 backdrop-blur-md max-h-[248px] sm:max-h-[280px] overflow-y-auto custom-scrollbar shadow-lg">
//               <table className="w-full border-collapse text-left text-xs">
//                 <thead>
//                   <tr className="bg-white/[0.02] border-b border-white/5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
//                     <th className="px-4 py-3">Visit Ref</th>
//                     <th className="px-4 py-3">Timestamp</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-white/5 font-medium text-slate-300">
//                   {[...visits].reverse().map((visit, idx) => (
//                     <tr key={visit._id || idx} className="hover:bg-white/[0.01] transition-colors">
//                       <td className="px-4 py-3 text-slate-500 font-mono">
//                         Hit #{visits.length - idx}
//                       </td>
//                       <td className="px-4 py-3 font-semibold text-slate-200">
//                         {formatDate(visit.timestamp)}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <div className="cyber-panel border border-dashed border-white/10 rounded-xl p-8 text-center bg-slate-900/10 shadow-inner">
//               <p className="text-xs text-slate-500 leading-relaxed max-w-[220px] mx-auto">
//                 No redirection activity recorded yet. Distribute your short link to capture logs.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnalyticsPage;


import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { urlAPI } from '../services/api';
import { formatDate, getShortLink, copyToClipboard } from '../utils/helpers';
import { QRCodeSVG } from 'qrcode.react';
import { ArrowLeft, ExternalLink, Calendar, MousePointerClick, Activity, Copy, Check, Info, QrCode, X } from 'lucide-react';

const AnalyticsPage = () => {
  const { shortCode } = useParams();
  const navigate = useNavigate();
  const [urlData, setUrlData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(false); // Manages the centered modal popover view

  useEffect(() => {
    fetchAnalytics();
  }, [shortCode]);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await urlAPI.getAnalytics(shortCode);
      setUrlData(response.data);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || 
        'Failed to fetch link analytics. Ensure you are authorized.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!urlData) return;
    const shortLink = getShortLink(urlData.shortCode);
    const success = await copyToClipboard(shortLink);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) return <LoadingSpinner fullPage />;
  
  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto space-y-4">
        <Link to="/links" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors duration-150 outline-none">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Links</span>
        </Link>
        <ErrorMessage message={error} />
      </div>
    );
  }

  const clicks = urlData.clicks || 0;
  const visits = urlData.visits || [];

  const getChartData = () => {
    const data = [];
    const now = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      const dateStr = d.toDateString();
      
      const count = visits.filter(v => {
        const visitDate = new Date(v.timestamp);
        return visitDate.toDateString() === dateStr;
      }).length;

      data.push({
        label: d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }),
        count
      });
    }
    return data;
  };

  const chartData = getChartData();
  const maxHits = Math.max(...chartData.map(d => d.count), 1);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-5 sm:space-y-6 relative">
      
      {/* Back Navigation Row */}
      <Link to="/links" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors duration-150 outline-none">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Links</span>
      </Link>

      {/* Main Title Metadata Card */}
      <div className="cyber-panel p-5 sm:p-7 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-md shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div className="space-y-1">
            <h1 className="text-3xl font-heading font-extrabold tracking-tight text-gradient-accent">
              /{urlData.shortCode}
            </h1>
            <div className="text-xs text-slate-400 max-w-xl truncate">
              Destination:{' '}
              <a href={urlData.originalUrl} target="_blank" rel="noopener noreferrer" className="text-slate-200 hover:text-indigo-400 underline font-medium transition-colors outline-none ml-1 inline-flex items-center gap-1">
                <span>{urlData.originalUrl}</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            </div>
          </div>

          {/* Action Row Deck */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto shrink-0">
            
            {/* Action 1: Copy Link */}
            <button 
              type="button"
              onClick={handleCopy} 
              className={`flex-1 md:flex-initial text-xs font-semibold px-4 py-2.5 rounded-xl border transition-all flex items-center justify-center gap-2 outline-none cursor-pointer ${
                copied 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                  : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Short URL'}</span>
            </button>

            {/* Action 2: Centered Modal Trigger */}
            <button 
              type="button"
              onClick={() => setShowQr(true)} 
              className="flex-1 md:flex-initial text-xs font-semibold px-4 py-2.5 rounded-xl border border-white/5 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2 outline-none cursor-pointer"
            >
              <QrCode className="w-4 h-4 text-cyan-400" />
              <span>QR Code</span>
            </button>

            {/* Action 3: Visit Route */}
            <a 
              href={getShortLink(urlData.shortCode)} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex-1 md:flex-initial text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 px-4 py-2.5 rounded-xl text-center shadow-lg shadow-indigo-600/10 flex items-center justify-center gap-2 outline-none"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Visit Link</span>
            </a>

          </div>
        </div>
      </div>

      {/* Summary Stat Cards Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        <div className="cyber-panel p-5 rounded-2xl flex items-center gap-4 bg-slate-900/20 border border-white/5 shadow-xl">
          <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl text-emerald-400 shrink-0">
            <MousePointerClick className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Total Link Hits</span>
            <span className="text-2xl font-heading font-black text-slate-100 block mt-0.5">{clicks}</span>
          </div>
        </div>

        <div className="cyber-panel p-5 rounded-2xl flex items-center gap-4 bg-slate-900/20 border border-white/5 shadow-xl">
          <div className="bg-indigo-500/10 border border-indigo-500/20 p-3 rounded-xl text-indigo-400 shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Date Shortened</span>
            <span className="text-sm font-semibold text-slate-200 block mt-1.5">{formatDate(urlData.createdAt)}</span>
          </div>
        </div>

        <div className="cyber-panel p-5 rounded-2xl flex items-center gap-4 bg-slate-900/20 border border-white/5 shadow-xl sm:col-span-2 lg:col-span-1">
          <div className="bg-pink-500/10 border border-pink-500/20 p-3 rounded-xl text-pink-400 shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">Last Active Hit</span>
            <span className="text-sm font-semibold text-slate-200 block mt-1.5">
              {urlData.lastVisited ? formatDate(urlData.lastVisited) : 'No hits recorded'}
            </span>
          </div>
        </div>
      </div>

      {/* Charts & Audit Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                {/* Left Side: Activity Distribution Graph Column */}
        <div className="lg:col-span-2 cyber-panel p-5 sm:p-7 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-md shadow-lg w-full">
          <h3 className="text-sm font-bold flex items-center gap-2 text-slate-200 mb-6 tracking-tight">
            <Activity className="w-4 h-4 text-indigo-400" />
            <span>Activity Distribution (Last 7 Days)</span>
          </h3>

          {/* Bar Chart Grid Core Content Area */}
          <div className="flex items-end justify-between h-48 sm:h-56 pt-4 border-b border-white/5 gap-2 sm:gap-4 overflow-x-auto min-w-[280px] custom-scrollbar">
            {chartData.map((day, idx) => {
              const pct = (day.count / maxHits) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group pb-1">
                  {/* Tooltip counter text floating layer */}
                  <span className={`text-[10px] font-bold transition-opacity ${day.count > 0 ? 'text-cyan-400' : 'text-slate-600'}`}>
                    {day.count}
                  </span>

                  {/* Dynamic Height Vector Column Bar Block */}
                  <div 
                    style={{ height: `${pct}%` }}
                    className={`w-full max-w-[36px] rounded-t-md transition-all duration-700 ease-out min-h-[2px] ${
                      day.count > 0 
                        ? 'bg-gradient-to-t from-indigo-600 to-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]' 
                        : 'bg-white/[0.02]'
                    }`}
                  />

                  {/* Day Date bottom row marker strings */}
                  <span className="text-[10px] font-semibold text-slate-500 whitespace-nowrap mt-1">
                    {day.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Raw Telemetry Real-time Traffic Log Stream */}
        <div className="lg:col-span-1 flex flex-col gap-4 w-full">
          <h3 className="text-sm font-bold flex items-center gap-2 text-slate-200 tracking-tight">
            <Info className="w-4 h-4 text-cyan-400" />
            <span>Telemetry Audit Logs ({visits.length})</span>
          </h3>

          {visits.length > 0 ? (
            <div className="w-full overflow-hidden rounded-xl border border-white/5 bg-slate-950/40 backdrop-blur-md max-h-[248px] sm:max-h-[280px] overflow-y-auto custom-scrollbar shadow-lg">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="bg-white/[0.02] border-b border-white/5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    <th className="px-4 py-3">Visit Ref</th>
                    <th className="px-4 py-3">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-medium text-slate-300">
                  {[...visits].reverse().map((visit, idx) => (
                    <tr key={visit._id || idx} className="hover:bg-white/[0.01] transition-colors">
                      <td className="px-4 py-3 text-slate-500 font-mono">
                        Hit #{visits.length - idx}
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-200">
                        {formatDate(visit.timestamp)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="cyber-panel border border-dashed border-white/10 rounded-xl p-8 text-center bg-slate-900/10 shadow-inner">
              <p className="text-xs text-slate-500 leading-relaxed max-w-[220px] mx-auto">
                No redirection activity recorded yet. Distribute your short link to capture logs.
              </p>
            </div>
          )}
        </div>
      </div>

        {/* 🔮 UNIQUE BONUS FEATURE: Center Floating Overlay Modal for QR Code */}
      {showQr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md transition-all duration-300 animate-fade-in">
          
          {/* Modal content box */}
          <div className="cyber-panel relative w-full max-w-sm bg-slate-900 border border-white/10 rounded-3xl p-6 text-center shadow-[0_20px_50px_rgba(0,0,0,0.6)] animate-slide-in">
            
            {/* Absolute close trigger button */}
            <button 
              type="button"
              onClick={() => setShowQr(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors outline-none cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Heading Details */}
            <div className="mb-5 mt-2">
              <span className="text-[9px] font-mono font-bold tracking-widest text-cyan-400 uppercase bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full">QR_GATEWAY_NODE</span>
              <h3 className="text-lg font-heading font-black text-white mt-3">Scan Short URL</h3>
              <p className="text-xs text-slate-400 mt-1">Point a mobile camera over this vector grid to traverse the redirect route instantly.</p>
            </div>

                   {/* The crisp, centered high-resolution QR matrix canvas box */}
            <div className="bg-white p-4 rounded-2xl inline-block border border-white/5 shadow-xl select-none mx-auto mb-2">
              <QRCodeSVG 
                value={getShortLink(urlData.shortCode)}
                size={140}
                level="M"
                includeMargin={false}
              />
            </div>
            
            <div className="text-[10px] font-mono text-slate-500 mt-2 font-bold select-none">
              ZIPLINK DATA ROUTER // /{urlData.shortCode}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AnalyticsPage;
