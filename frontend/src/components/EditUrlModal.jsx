import React, { useState, useEffect } from 'react';
import { urlAPI } from '../services/api';
import ErrorMessage from './ErrorMessage';
import { X, Save, Edit } from 'lucide-react';

const EditUrlModal = ({ url, isOpen, onClose, onUpdateSuccess }) => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (url) {
      setOriginalUrl(url.originalUrl);
      setError(null);
    }
  }, [url]);

  if (!isOpen || !url) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!originalUrl.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const response = await urlAPI.update(url._id, originalUrl.trim());
      onUpdateSuccess(response.data);
      onClose();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Failed to update URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      
      {/* Central Interactive Modal Panel */}
      <div className="section-panel relative w-full max-w-lg !p-6 sm:!p-8">
        
        {/* Dynamic Absolute Close Trigger */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Decorative Header */}
        <div className="mb-5">
          <h3 className="text-lg font-heading font-bold flex items-center gap-2 text-slate-100">
            <Edit className="w-5 h-5 text-indigo-400" />
            <span>Edit Destination URL</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Updating the target location link redirecting from code: <strong className="text-cyan-400 font-mono">/{url.shortCode}</strong>
          </p>
        </div>

        {/* Localized Error Output Banner */}
        {error && (
          <div className="mb-4">
            <ErrorMessage message={error} />
          </div>
        )}

        {/* Interactive Form Context */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400" htmlFor="edit-url">
              New Destination URL
            </label>
            <input
              type="url"
              id="edit-url"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              required
              autoFocus
              placeholder="https://example.com"
              className="input-field"
            />
          </div>

          {/* Action Row Deck (Stacks on ultra-small screens, rows on sm:) */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="btn-secondary w-full sm:w-auto px-5 py-2.5"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={loading || !originalUrl.trim() || originalUrl === url.originalUrl}
              className="btn-primary !w-full sm:!w-auto sm:min-w-[9.5rem] !py-2.5"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-400 border-t-white rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUrlModal;
