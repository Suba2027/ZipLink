import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { copyToClipboard, getShortLink, formatDate } from '../utils/helpers';
import { Copy, Check, ExternalLink, BarChart2, Edit2, Trash2 } from 'lucide-react';

const UrlItem = ({ url, onEdit, onDelete }) => {
  const [copied, setCopied] = useState(false);
  const shortLink = getShortLink(url.shortCode);

  const handleCopy = async () => {
    const success = await copyToClipboard(shortLink);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const truncateUrl = (str, len = 35) => {
    if (str.length <= len) return str;
    return str.substring(0, len) + '...';
  };

  return (
    <>
      {/* 🖥️ Desktop Row Layout (Hidden on Mobile screens, visible on md: and up) */}
      <tr className="hidden md:table-row border-b border-white/5 hover:bg-white/[0.015] transition-colors duration-150">
        
        {/* Column 1: Short Access Gateway Code */}
        <td className="px-6 py-4 font-semibold text-sm whitespace-nowrap w-[180px]">
          <div className="flex items-center gap-2">
            <a
              href={shortLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1 group outline-none"
            >
              <span>/{url.shortCode}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>

            <button
              type="button"
              onClick={handleCopy}
              className={`p-1.5 rounded-lg hover:bg-white/5 transition-all outline-none cursor-pointer ${
                copied ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'
              }`}
              title="Copy link to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </td>

        {/* Column 2: Clamped Destination Pointer */}
        {/* 🌟 OPTIMIZATION: Implemented custom width limits to prevent wide URLs from crowding buttons */}
        <td className="px-6 py-4 max-w-[240px] lg:max-w-[380px] xl:max-w-[500px]">
          <a
            href={url.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-indigo-400 text-xs font-medium block truncate transition-colors outline-none"
            title={url.originalUrl}
          >
            {url.originalUrl}
          </a>
        </td>

        {/* Column 3: Dynamic Metric Badge Counters */}
        <td className="px-6 py-4 whitespace-nowrap w-[120px]">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {url.clicks} clicks
          </span>
        </td>

        {/* Column 4: Node Timestamp */}
        <td className="px-6 py-4 text-xs font-medium text-slate-400 whitespace-nowrap w-[150px]">
          {formatDate(url.createdAt)}
        </td>

        {/* Column 5: System Interactive Control Deck */}
        {/* 🌟 OPTIMIZATION: Hardcoded minimum element allocation sizes to lock row dimensions cleanly */}
        <td className="px-6 py-4 w-[240px] min-w-[240px] text-right">
          <div className="flex items-center justify-end gap-2">
            <Link
              to={`/analytics/${url.shortCode}`}
              className="btn-accent"
              title="View analytics"
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Stats</span>
            </Link>

            <button
              type="button"
              onClick={() => onEdit(url)}
              className="btn-secondary"
              title="Edit destination URL"
            >
              <Edit2 className="w-3.5 h-3.5 text-slate-400" />
              <span>Edit</span>
            </button>

            <button
              type="button"
              onClick={() => onDelete(url._id)}
              className="btn-danger-icon"
              title="Delete link"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </td>
      </tr>

      {/* 📱 Mobile Modular Card Layout (Visible on small displays, blocked on desktop md:) */}
      <div className="block md:hidden cyber-panel rounded-xl border border-white/5 bg-slate-900/30 p-4 space-y-3.5 shadow-lg">
        <div className="flex items-center justify-between gap-2">
          {/* Active Short link header */}
          <div className="flex items-center gap-1.5">
            <a
              href={shortLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 font-bold text-base flex items-center gap-1"
            >
              <span>/{url.shortCode}</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>
            
            <button
              type="button"
              onClick={handleCopy}
              className="p-1.5 rounded-lg bg-white/5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            </button>
          </div>

          {/* Traffic tracking telemetry */}
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            {url.clicks} clicks
          </span>
        </div>

        {/* Real raw route path readout */}
        <div className="space-y-0.5">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Destination Redirect</span>
          <a
            href={url.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-300 font-medium break-all block hover:text-indigo-400 transition-colors"
          >
            {truncateUrl(url.originalUrl, 42)}
          </a>
        </div>

        <div className="flex items-center justify-between gap-4 pt-2 border-t border-white/5">
          {/* Creation date info marker */}
          <span className="text-[11px] font-medium text-slate-500">
            Created: {formatDate(url.createdAt).split(',')[0]}
          </span>

          {/* Touch interactive dashboard controllers */}
          <div className="flex items-center gap-1.5">
            <Link
              to={`/analytics/${url.shortCode}`}
              className="btn-accent"
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Stats</span>
            </Link>

            <button
              type="button"
              onClick={() => onEdit(url)}
              className="btn-secondary"
            >
              <Edit2 className="w-3.5 h-3.5 text-slate-400" />
              <span>Edit</span>
            </button>

            <button
              type="button"
              onClick={() => onDelete(url._id)}
              className="btn-danger-icon"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UrlItem;
