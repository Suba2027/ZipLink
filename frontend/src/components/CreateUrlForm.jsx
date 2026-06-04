import React, { useState } from 'react';
import { urlAPI } from '../services/api';
import ErrorMessage from './ErrorMessage';
import { Link2, Sparkles, FileText, UploadCloud, AlertCircle, CheckCircle2, ChevronDown, Calendar, Lock, Eye, EyeOff } from 'lucide-react';

const CreateUrlForm = ({ onUrlCreated }) => {
  const [activeTab, setActiveTab] = useState('single'); // 'single' | 'bulk'
  const [originalUrl, setOriginalUrl] = useState('');
  const [csvContent, setCsvContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bulkResult, setBulkResult] = useState(null);
  const [success, setSuccess] = useState(null);

  // ─── INTERACTIVE ACCORDION UI STATE MATRIX ──────────────────
  const [isExpanded, setIsExpanded] = useState(false);
  const [enableExpiration, setEnableExpiration] = useState(false);
  const [enablePassword, setEnablePassword] = useState(false);
  const [expiresAt, setExpiresAt] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Prevents users from selecting past calendar timestamps
  const minDateTime = new Date().toISOString().slice(0, 16);

  const handleSingleSubmit = async (e) => {
    e.preventDefault();
    if (!originalUrl.trim()) return;
    if (enableExpiration && expiresAt) {
    const selectedDate = new Date(expiresAt).getTime();
    const currentDate = new Date().getTime();
    
    if (selectedDate <= currentDate) {
      setError("Expiration time must be set to a future date and time.");
      return;
    }
  }
    setLoading(true);
    setError(null);
    setSuccess(null);
    setBulkResult(null);

    try {
      // Build dynamic payload object based on active configurations
      const payload = {
        originalUrl: originalUrl.trim(),
        expiresAt: enableExpiration && expiresAt ? expiresAt : null,
        password: enablePassword && password.trim() ? password : null
      };

      const response = await urlAPI.create(payload);
      onUrlCreated(response.data);
      
      // Clean form resetting
      setOriginalUrl('');
      setExpiresAt('');
      setPassword('');
      setEnableExpiration(false);
      setEnablePassword(false);
      setIsExpanded(false);
      
      setSuccess('URL shortened successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Failed to shorten URL');
    } finally {
      setLoading(false);
    }
  };

  const handleBulkSubmit = async (e) => {
    e.preventDefault();
    if (!csvContent.trim()) {
      setError('Please provide CSV data or upload a CSV file.');
      return;
    }
    setLoading(true);
    setError(null);
    setBulkResult(null);

    try {
      const response = await urlAPI.bulk(csvContent);
      onUrlCreated(response.data.inserted);
      setCsvContent('');
      setFileName('');
      setBulkResult({
        success: true,
        message: response.data.message,
        insertedCount: response.data.inserted.length,
        failedCount: response.data.failed.length,
        failed: response.data.failed
      });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to process bulk URLs');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      setError('Invalid file format. Please upload a standard CSV file.');
      return;
    }

    setFileName(file.name);
    setError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      setCsvContent(event.target.result);
    };
    reader.onerror = () => {
      setError('Error reading file. Please try again.');
    };
    reader.readAsText(file);
  };

  return (
    <div className="section-panel !p-5 sm:!p-6 h-fit w-full">
      <div className="flex bg-slate-950/80 p-1 rounded-xl mb-5 border border-white/5 gap-1">
        <button
          type="button"
          onClick={() => { setActiveTab('single'); setError(null); setBulkResult(null); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold outline-none cursor-pointer transition-colors duration-200 ${
            activeTab === 'single' ? 'tab-active' : 'tab-inactive'
          }`}
        >
          <Link2 className="w-4 h-4" />
          <span>Shorten Link</span>
        </button>
        <button
          type="button"
          onClick={() => { setActiveTab('bulk'); setError(null); setBulkResult(null); }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold outline-none cursor-pointer transition-colors duration-200 ${
            activeTab === 'bulk' ? 'tab-active' : 'tab-inactive'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Bulk CSV</span>
        </button>
      </div>

      {/* Dynamic Error Component Output Banner */}
      {error && (
        <div className="mb-4">
          <ErrorMessage message={error} />
        </div>
      )}

      {/* Single Shorten Link Success Toast Bar */}
      {success && (
        <div className="flex items-center gap-2.5 px-4 py-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-xl text-sm font-medium mb-5 shadow-[0_0_15px_rgba(16,185,129,0.05)]">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Bulk Complete Metric Breakdown Display Panel */}
      {bulkResult && (
        <div className="px-4 py-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl mb-5 shadow-lg">
          <h4 className="text-cyan-400 text-sm font-bold flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4" />
            Bulk Processing Completed
          </h4>
          <p className="text-xs text-slate-300">
            Created <span className="font-bold text-slate-100">{bulkResult.insertedCount}</span> links. 
            Failed <span className="font-bold text-rose-400">{bulkResult.failedCount}</span> nodes.
          </p>
          
          {bulkResult.failedCount > 0 && (
            <div className="mt-3 max-h-24 overflow-y-auto bg-slate-950/60 border border-white/5 rounded-lg p-2 space-y-1.5 custom-scrollbar">
              {bulkResult.failed.map((f, idx) => (
                <div key={idx} className="text-[11px] text-rose-400/90 flex items-start gap-1.5 leading-tight">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-rose-500" />
                  <span>Line {f.lineNum}: {f.error} <code className="bg-white/5 px-1 rounded text-slate-300">"{f.data.substring(0, 20)}..."</code></span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Single Route Submission Block */}
      {activeTab === 'single' && (
        <form onSubmit={handleSingleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400" htmlFor="originalUrl">
              Destination URL
            </label>
            <input
              type="url"
              id="originalUrl"
              placeholder="https://example.com"
              value={originalUrl}
              onChange={(e) => { setOriginalUrl(e.target.value); if (error) setError(null); }}
              required
              autoComplete="new-password"
              className="input-field"
            />
          </div>

          {/* ─── EXPANDABLE CONFIGURATION ACCORDION PANEL ─── */}
          <div className="border-t border-white/5 pt-2 mt-1">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-between py-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-slate-200 transition-colors duration-150 outline-none cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Advanced Security & Expiry</span>
              </div>
              <ChevronDown 
                className={`w-4 h-4 transition-transform duration-300 ${
                  isExpanded ? 'rotate-180 text-cyan-400' : 'text-slate-500'
                }`} 
              />
            </button>

            {/* Smooth Slide Transition Core Wrapper Utilizing Pure CSS Grids */}
            <div 
              className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
                isExpanded ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden min-h-0 space-y-4 bg-slate-950/40 border border-white/5 rounded-xl p-4">
                
                {/* Setting 1: Link Expiration Calendar */}
                <div className="space-y-2.5">
                  <label className="flex items-center gap-3 cursor-pointer select-none group">
                    <input
                      type="checkbox"
                      checked={enableExpiration}
                      onChange={(e) => setEnableExpiration(e.target.checked)}
                  className="w-4 h-4 rounded border-white/10 bg-slate-900 text-indigo-500 focus:ring-indigo-500/30 accent-indigo-500 cursor-pointer"
                />
                <span className="text-xs font-semibold text-slate-300 group-hover:text-slate-200 transition-colors">Set Link Expiration Schedule</span>
              </label>
              
              <div className={`transition-all duration-200 ${enableExpiration ? 'max-h-20 opacity-100 mt-2' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="datetime-local"
                    required={enableExpiration}
                    value={expiresAt}
                     onChange={(e) => {
                      setExpiresAt(e.target.value);
                      if (error) setError(null);
                    }}
                    autoComplete="off"
                    className="w-full pl-12 pr-4 py-2.5 bg-slate-950 border border-white/20 rounded-lg text-slate-300 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-xs font-medium outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Setting 2: Gateway Password Protection */}
            <div className="space-y-2.5">
              <label className="flex items-center gap-3 cursor-pointer select-none group">
                <input
                  type="checkbox"
                  checked={enablePassword}
                  onChange={(e) => setEnablePassword(e.target.checked)}
                  className="w-4 h-4 rounded border-white/10 bg-slate-900 text-indigo-500 focus:ring-indigo-500/30 accent-indigo-500 cursor-pointer"
                />
                <span className="text-xs font-semibold text-slate-300 group-hover:text-slate-200 transition-colors">Enforce Access Gateway Password</span>
              </label>

              <div className={`transition-all duration-200 ${enablePassword ? 'max-h-20 opacity-100 mt-2' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Specify access verification code..."
                    required={enablePassword}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError(null);
                    }}
                    autoComplete="new-password"
                    className="w-full pl-12 pr-12 py-2.5 bg-slate-950 border border-white/20 rounded-lg text-slate-300 placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-xs font-medium outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 outline-none cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      <button 
        type="submit" 
        disabled={loading || !originalUrl.trim()}
        className="btn-primary"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-slate-400 border-t-white rounded-full animate-spin" />
            <span>Shortening...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            <span>Shorten URL</span>
          </>
        )}
      </button>
    </form>
  )}

  {/* ─── BULK UPLOAD SPREADSHEET MODULE FORM ────────────────── */}
  {activeTab === 'bulk' && (
    <form onSubmit={handleBulkSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Upload CSV File
        </label>
        
        <div className="relative border-2 border-dashed border-white/10 hover:border-cyan-500/50 rounded-xl p-6 transition-colors duration-150 bg-slate-950/40 text-center flex flex-col items-center justify-center group">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <UploadCloud className="w-9 h-9 text-slate-500 group-hover:text-cyan-400 transition-colors mb-2" />
          
          <span className="text-sm font-medium text-slate-300 block mb-0.5">
            {fileName ? fileName : 'Click or Drag CSV here'}
          </span>
          <span className="text-[11px] text-slate-500 block">
            {fileName ? 'Accepts single column of URLs' : 'File must contain an originalUrl column header'}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center text-[10px] font-bold text-slate-600 uppercase tracking-widest my-1">
        — OR PASTE CSV CONTENT BELOW —
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          CSV Text Data
        </label>
        <textarea
          rows={4}
          placeholder={"https://google.com\nhttps://github.com\nhttps://mozilla.org"}
          value={csvContent}
          onChange={(e) => { 
            setCsvContent(e.target.value); 
            if (error) setError(null); 
            if (e.target.value && !fileName) setFileName('Raw text inputted'); 
          }}
          className="input-field font-mono resize-none custom-scrollbar min-h-[100px]"
        />
      </div>

      <button 
        type="submit" 
        disabled={loading || !csvContent.trim()}
        className="btn-primary"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-slate-400 border-t-white rounded-full animate-spin" />
            <span>Processing Bulk...</span>
          </>
        ) : (
          <>
            <FileText className="w-4 h-4" />
            <span>Bulk Shorten URLs</span>
          </>
        )}
      </button>
    </form>
  )}
</div>
);
};

export default CreateUrlForm;
