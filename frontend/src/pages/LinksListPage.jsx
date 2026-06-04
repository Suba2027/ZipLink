import React, { useState, useEffect } from 'react';
import UrlList from '../components/UrlList';
import EditUrlModal from '../components/EditUrlModal';
import { urlAPI } from '../services/api';
import { useToast } from '../context/ToastContext';

const LinksListPage = () => {
  const showToast = useToast();
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingUrl, setEditingUrl] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await urlAPI.getAll();
      setUrls(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to retrieve shortened links. Please refresh.');
      showToast('Error syncing links from server.', 'error');
    } finally {
      setLoading(false);
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

  return (
    <div className="page-shell">
      <header className="page-header">
        <h1 className="page-title">My links</h1>
        <p className="page-subtitle">
          Full list of your short links with search, edit, analytics, and delete.
        </p>
      </header>

      <div className="section-panel">
        {error ? (
          <div className="p-4 border border-rose-500/20 bg-rose-500/5 rounded-xl text-sm font-medium text-rose-400">
            {error}
          </div>
        ) : (
          <UrlList
            urls={urls}
            loading={loading}
            onEdit={handleEditTrigger}
            onDelete={handleDeleteTrigger}
          />
        )}
      </div>

      <EditUrlModal
        url={editingUrl}
        isOpen={isEditOpen}
        onClose={() => { setIsEditOpen(false); setEditingUrl(null); }}
        onUpdateSuccess={handleUpdateSuccess}
      />
    </div>
  );
};

export default LinksListPage;
