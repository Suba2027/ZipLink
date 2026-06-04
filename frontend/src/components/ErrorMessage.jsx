import React from 'react';
import { AlertOctagon } from 'lucide-react';

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  // If message is an array (e.g. from express-validator format)
  if (Array.isArray(message)) {
    return (
      <div className="glass-panel" style={{
        borderColor: 'rgba(239, 68, 68, 0.4)',
        background: 'rgba(239, 68, 68, 0.08)',
        padding: '16px',
        borderRadius: 'var(--radius-sm)',
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        {message.map((err, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-danger)', fontSize: '0.9rem' }}>
            <AlertOctagon size={16} style={{ flexShrink: 0 }} />
            <span>{err.msg || err.message || JSON.stringify(err)}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="glass-panel" style={{
      borderColor: 'rgba(239, 68, 68, 0.4)',
      background: 'rgba(239, 68, 68, 0.08)',
      padding: '16px',
      borderRadius: 'var(--radius-sm)',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      color: 'var(--color-danger)',
      fontSize: '0.9rem'
    }}>
      <AlertOctagon size={18} style={{ flexShrink: 0 }} />
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
