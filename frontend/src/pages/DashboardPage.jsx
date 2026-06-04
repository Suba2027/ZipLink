import React, { useState, useEffect } from 'react';
import CreateUrlForm from '../components/CreateUrlForm';
import UrlList from '../components/UrlList';
import EditUrlModal from '../components/EditUrlModal';
import { urlAPI } from '../services/api';
import { formatDate } from '../utils/helpers';
import { useToast } from '../context/ToastContext';
import { Link2, MousePointerClick, Calendar } from 'lucide-react';

const DashboardPage = () => {
  const showToast = useToast();
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUrl, setEditingUrl] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    fetchUrlMetrics();
  }, []);

  const fetchUrlMetrics = async () => {
    setLoading(true);
    try {
      const response = await urlAPI.getAll();
      setUrls(response.data);
    } catch (err) {
      console.error(err);
      showToast('Error syncing telemetry metrics from server.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleUrlCreated = (newUrlData) => {
    if (Array.isArray(newUrlData)) {
      setUrls((prev) => [...newUrlData, ...prev]);
      showToast(`Successfully registered ${newUrlData.length} batch links!`, 'success');
    } else {
      setUrls((prev) => [newUrlData, ...prev]);
      showToast('Short route mapped successfully.', 'success');
    }
  };

  const handleEditTrigger = (url) => {
    setEditingUrl(url);
    setIsEditOpen(true);
  };

  const handleUpdateSuccess = (updatedUrl) => {
    setUrls((prev) =>
      prev.map((item) => (item._id === updatedUrl._id ? updatedUrl : item))
    );
    showToast('Redirect target variable overridden.', 'success');
  };

  const handleDeleteTrigger = async (id) => {
    if (!window.confirm('Are you sure you want to delete this shortened link?')) {
      return;
    }
    try {
      await urlAPI.delete(id);
      setUrls((prev) => prev.filter((item) => item._id !== id));
      showToast('Link node deleted from database.', 'info');
    } catch (err) {
      console.error(err);
      showToast('Failed to delete target redirect node.', 'error');
    }
  };

  const totalLinks = urls.length;
  const totalClicks = urls.reduce((sum, item) => sum + (item.clicks || 0), 0);

  const getLastVisited = () => {
    const dates = urls
      .map((item) => item.lastVisited)
      .filter(Boolean)
      .map((d) => new Date(d));
    if (dates.length === 0) return 'Never';
    const maxDate = new Date(Math.max(...dates));
    return formatDate(maxDate);
  };

  return (
    <div className="page-shell">
      <header className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">
          Shorten URLs, track clicks, and manage your links in one place.
        </p>
      </header>

      <section className="section-block" aria-labelledby="create-link-heading">
        <h2 id="create-link-heading" className="section-heading">
          Create short link
        </h2>
        <CreateUrlForm onUrlCreated={handleUrlCreated} />
      </section>

      <section className="section-block" aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="section-heading">
          Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="stat-card">
            <div className="bg-indigo-500/10 border border-indigo-500/20 p-2.5 rounded-lg text-indigo-400 shrink-0">
              <Link2 className="w-5 h-5" aria-hidden />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">
                Total links
              </span>
              <span className="text-2xl font-heading font-bold text-slate-100 tabular-nums">
                {loading ? '—' : totalLinks}
              </span>
            </div>
          </div>

          <div className="stat-card">
            <div className="bg-cyan-500/10 border border-cyan-500/20 p-2.5 rounded-lg text-cyan-400 shrink-0">
              <MousePointerClick className="w-5 h-5" aria-hidden />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">
                Total clicks
              </span>
              <span className="text-2xl font-heading font-bold text-cyan-400 tabular-nums">
                {loading ? '—' : totalClicks}
              </span>
            </div>
          </div>

          <div className="stat-card">
            <div className="bg-pink-500/10 border border-pink-500/20 p-2.5 rounded-lg text-pink-400 shrink-0">
              <Calendar className="w-5 h-5" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">
                Last activity
              </span>
              <span className="text-sm font-semibold text-slate-200 truncate block mt-0.5">
                {loading ? '—' : getLastVisited()}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-panel" aria-labelledby="recent-links-heading">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
          <div>
            <h2 id="recent-links-heading" className="text-lg font-heading font-semibold text-slate-100">
              Recent links
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Search, edit, view analytics, or remove links.
            </p>
          </div>
          {!loading && (
            <span className="text-xs font-medium text-slate-400 bg-white/5 border border-white/5 px-2.5 py-1 rounded-full w-fit">
              {urls.length} {urls.length === 1 ? 'link' : 'links'}
            </span>
          )}
        </div>
        <UrlList
          urls={urls}
          loading={loading}
          onEdit={handleEditTrigger}
          onDelete={handleDeleteTrigger}
          embedded
        />
      </section>

      <EditUrlModal
        url={editingUrl}
        isOpen={isEditOpen}
        onClose={() => {
          setIsEditOpen(false);
          setEditingUrl(null);
        }}
        onUpdateSuccess={handleUpdateSuccess}
      />
    </div>
  );
};

export default DashboardPage;
