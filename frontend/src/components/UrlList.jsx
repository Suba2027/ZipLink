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
