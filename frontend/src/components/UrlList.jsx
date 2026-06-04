// // import React, { useState } from 'react';
// // import UrlItem from './UrlItem';
// // import { Search, Link2, AlertCircle } from 'lucide-react';

// // const UrlList = ({ urls, loading, onEdit, onDelete }) => {
// //   const [searchTerm, setSearchTerm] = useState('');

// //   // Filter URLs based on original URL or short code
// //   const filteredUrls = urls.filter((url) => {
// //     const search = searchTerm.toLowerCase();
// //     return (
// //       url.originalUrl.toLowerCase().includes(search) ||
// //       url.shortCode.toLowerCase().includes(search)
// //     );
// //   });

// //   if (loading) {
// //     return (
// //       <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
// //         <div className="spinner"></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
// //       {/* List Actions / Search */}
// //       <div style={{
// //         display: 'flex',
// //         alignItems: 'center',
// //         justifyContent: 'space-between',
// //         flexWrap: 'wrap',
// //         gap: '12px'
// //       }}>
// //         <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
// //           <Link2 size={20} color="var(--color-primary)" />
// //           <span>My Short Links ({filteredUrls.length})</span>
// //         </h3>

// //         {urls.length > 0 && (
// //           <div style={{ position: 'relative', display: 'flex', alignItems: 'center', minWidth: '260px' }}>
// //             <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px' }} />
// //             <input
// //               type="text"
// //               placeholder="Search links..."
// //               value={searchTerm}
// //               onChange={(e) => setSearchTerm(e.target.value)}
// //               className="form-input"
// //               style={{
// //                 width: '100%',
// //                 padding: '8px 12px 8px 36px',
// //                 fontSize: '0.85rem',
// //                 borderRadius: '8px'
// //               }}
// //             />
// //           </div>
// //         )}
// //       </div>

// //       {/* Main Table Panel */}
// //       {filteredUrls.length > 0 ? (
// //         <div className="table-container">
// //           <table className="custom-table">
// //             <thead>
// //               <tr>
// //                 <th>Short Link</th>
// //                 <th>Destination</th>
// //                 <th>Clicks</th>
// //                 <th>Created</th>
// //                 <th>Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {filteredUrls.map((url) => (
// //                 <UrlItem
// //                   key={url._id}
// //                   url={url}
// //                   onEdit={onEdit}
// //                   onDelete={onDelete}
// //                 />
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       ) : (
// //         <div className="glass-panel" style={{
// //           padding: '60px 40px',
// //           textAlign: 'center',
// //           background: 'rgba(16, 16, 31, 0.3)',
// //           borderStyle: 'dashed'
// //         }}>
// //           <AlertCircle size={44} color="var(--text-muted)" style={{ marginBottom: '16px' }} />
// //           <h4 style={{ fontSize: '1.1rem', marginBottom: '6px' }}>
// //             {urls.length === 0 ? 'No links created yet' : 'No matching links found'}
// //           </h4>
// //           <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '320px', margin: '0 auto' }}>
// //             {urls.length === 0 
// //               ? 'Get started by pasting your first destination URL on the left panel.' 
// //               : 'Try checking your spelling or search for another short code.'}
// //           </p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default UrlList;
// import React, { useState } from 'react';
// import UrlItem from './UrlItem';
// import { Search, Link2, AlertCircle } from 'lucide-react';

// const UrlList = ({ urls, loading, onEdit, onDelete }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   // Clean filtration matrix engine
//   const filteredUrls = urls.filter((url) => {
//     const search = searchTerm.toLowerCase();
//     return (
//       url.originalUrl.toLowerCase().includes(search) ||
//       url.shortCode.toLowerCase().includes(search)
//     );
//   });

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center py-16 w-full">
//         <div className="animate-spin rounded-full h-10 w-10 border-2 border-slate-700 border-t-indigo-500" />
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col gap-5 w-full">
      
//       {/* Dynamic Header Row with Responsive Alignment Controls */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
//         <h3 className="text-lg font-bold flex items-center gap-2 tracking-tight">
//           <Link2 className="w-5 h-5 text-indigo-400 shrink-0" />
//           <span>My Short Links ({filteredUrls.length})</span>
//         </h3>

//         {/* Dynamic Search Box */}
//         {urls.length > 0 && (
//           <div className="relative flex items-center w-full sm:max-w-xs group">
//             <Search className="w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors absolute left-3 pointer-events-none" />
//             <input
//               type="text"
//               placeholder="Search links or codes..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full bg-slate-950/80 border border-white/20 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-slate-200 placeholder-slate-600 pl-9 pr-4 py-2 rounded-xl text-xs outline-none"
//             />
//           </div>
//         )}
//       </div>

//       {/* Main Data Container Module */}
//       {filteredUrls.length > 0 ? (
//         <div className="w-full">
//           {/* Desktop Table View Layer (Visible on large viewports, block-hidden on small displays) */}
//           <div className="hidden md:block w-full overflow-hidden rounded-xl border border-white/5 bg-slate-950/40 backdrop-blur-md shadow-2xl">
//             <table className="w-full border-collapse text-left">
//               <thead>
//                 <tr className="bg-white/[0.02] border-b border-white/5">
//                   <th className="px-6 py-3.5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Short Link</th>
//                   <th className="px-6 py-3.5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Destination</th>
//                   <th className="px-6 py-3.5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Clicks</th>
//                   <th className="px-6 py-3.5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Created</th>
//                   <th className="px-6 py-3.5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-white/5">
//                 {filteredUrls.map((url) => (
//                   <UrlItem
//                     key={url._id}
//                     url={url}
//                     onEdit={onEdit}
//                     onDelete={onDelete}
//                   />
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Mobile Stacking Display Engine (Renders cards on small displays, blocked on desktop md:) */}
//           <div className="block md:hidden flex flex-col gap-3.5 w-full">
//             {filteredUrls.map((url) => (
//               <UrlItem
//                 key={url._id}
//                 url={url}
//                 onEdit={onEdit}
//                 onDelete={onDelete}
//               />
//             ))}
//           </div>
//         </div>
//       ) : (
//         /* Empty Results Fallback UI */
//         <div className="cyber-panel border border-dashed border-white/10 rounded-2xl p-10 sm:p-14 bg-slate-900/10 text-center flex flex-col items-center justify-center shadow-inner animate-slide-in">
//           <div className="p-3.5 bg-slate-950/60 rounded-2xl border border-white/5 mb-4 shadow-xl">
//             <AlertCircle className="w-8 h-8 text-slate-500 animate-pulse" />
//           </div>
//           <h4 className="text-base font-bold text-slate-200 mb-1">
//             {urls.length === 0 ? 'No links indexed yet' : 'No matching routes matched'}
//           </h4>
//           <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
//             {urls.length === 0 
//               ? 'Get started by running a single link or uploading a batch CSV spreadsheet above.' 
//               : 'Double check spelling coordinates or input an explicit path directory.'}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UrlList;
import React, { useState } from 'react';
import UrlItem from './UrlItem';
import { Search, Link2, AlertCircle } from 'lucide-react';

const UrlList = ({ urls, loading, onEdit, onDelete, embedded = false }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Clean filtration matrix engine
  const filteredUrls = urls.filter((url) => {
    const search = searchTerm.toLowerCase();
    return (
      url.originalUrl.toLowerCase().includes(search) ||
      url.shortCode.toLowerCase().includes(search)
    );
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 w-full">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-slate-700 border-t-indigo-500" />
      </div>
    );
  }

  return (
    <div className={`flex flex-col w-full ${embedded ? 'gap-4' : 'gap-5'}`}>
      <div className={`flex flex-col sm:flex-row sm:items-center gap-3 w-full ${embedded ? 'sm:justify-end' : 'sm:justify-between'}`}>
        {!embedded && (
          <h3 className="text-lg font-heading font-semibold flex items-center gap-2 text-slate-100">
            <Link2 className="w-5 h-5 text-cyan-400 shrink-0" aria-hidden />
            <span>My short links ({filteredUrls.length})</span>
          </h3>
        )}

        {urls.length > 0 && (
          <div className={`relative flex items-center w-full group ${embedded ? 'sm:max-w-sm' : 'sm:max-w-xs'}`}>
            <Search className="w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors absolute left-3 pointer-events-none" aria-hidden />
            <input
              type="search"
              placeholder="Search links or codes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field-sm pl-9 pr-4 py-2 rounded-xl"
              aria-label="Search links"
            />
          </div>
        )}
      </div>

      {/* Main Data Container Module */}
      {filteredUrls.length > 0 ? (
        <div className="w-full">
          {/* Desktop Table View Layer (Visible on large viewports, block-hidden on small displays) */}
          {/* 🌟 OPTIMIZED INTRA-SCROLL CONTAINER: Height is strictly bound; overflow enables inner scrolling only */}
          <div className="hidden md:block w-full max-h-[500px] overflow-y-auto overflow-x-auto custom-scrollbar rounded-xl border border-white/5 bg-slate-950/40 backdrop-blur-md shadow-lg pr-3 relative">
            <table className="w-full border-collapse text-left min-w-[850px]">
              {/* 🌟 OPTIMIZED STICKY HEADER LAYER: Locked to top boundary using a solid opacity filter block */}
              <thead className="sticky top-0 z-20 bg-[#0d0d18] shadow-[0_1px_0_0_rgba(255,255,255,0.05)]">
                <tr>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Short Link</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Destination</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Clicks</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Created</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredUrls.map((url) => (
                  <UrlItem
                    key={url._id}
                    url={url}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Stacking Display Engine (Renders cards on small displays, blocked on desktop md:) */}
          <div className="block md:hidden flex flex-col gap-3.5 w-full max-h-[500px] overflow-y-auto custom-scrollbar">
            {filteredUrls.map((url) => (
              <UrlItem
                key={url._id}
                url={url}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Empty Results Fallback UI */
        <div className="cyber-panel border border-dashed border-white/10 rounded-2xl p-8 sm:p-10 bg-slate-900/10 text-center flex flex-col items-center justify-center shadow-inner">
          <div className="p-3.5 bg-slate-950/60 rounded-2xl border border-white/5 mb-4 shadow-lg">
            <AlertCircle className="w-8 h-8 text-slate-500" />
          </div>
          <h4 className="text-base font-bold text-slate-200 mb-1">
            {urls.length === 0 ? 'No links indexed yet' : 'No matching routes matched'}
          </h4>
          <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
            {urls.length === 0 
              ? 'Create your first short link using the form above.' 
              : 'Try a different search term or short code.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default UrlList;
