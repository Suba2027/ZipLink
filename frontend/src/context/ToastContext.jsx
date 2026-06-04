import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

const ICONS = {
  success: <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />,
  error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
  info: <Info className="w-5 h-5 text-cyan-400 shrink-0" />,
};

const THEMES = {
  success: 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.1)]',
  error: 'bg-rose-950/40 border-rose-500/30 text-rose-200 shadow-[0_0_15px_rgba(244,63,94,0.1)]',
  info: 'bg-cyan-950/40 border-cyan-500/30 text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.1)]',
};

let _id = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const show = useCallback((message, type = 'info', duration = 3500) => {
    const id = ++_id;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration);
  }, []);

  const dismiss = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}

      {/* Responsive Toast Container */}
      <div className="fixed top-4 left-4 right-4 sm:top-auto sm:bottom-6 sm:right-6 sm:left-auto z-50 flex flex-col gap-3 pointer-events-none max-w-md ml-auto">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl border backdrop-blur-md transition-all duration-300 animate-slide-in text-sm font-medium ${THEMES[toast.type] || THEMES.info}`}
          >
            <div class="flex items-center gap-2.5">
              {ICONS[toast.type]}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => dismiss(toast.id)}
              className="text-slate-400 hover:text-slate-200 transition-colors duration-150 p-0.5 rounded-lg hover:bg-white/5 outline-none"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used inside a ToastProvider');
  return context.show;
};
