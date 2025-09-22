'use client';

import { useState, useCallback } from 'react';
import Toast, { ToastType } from './Toast';

interface ToastData {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContainerProps {
  className?: string;
}

export default function ToastContainer({ className = "" }: ToastContainerProps) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = useCallback((
    type: ToastType,
    title: string,
    message?: string,
    duration?: number
  ) => {
    const id = Date.now().toString();
    const toast: ToastData = { id, type, title, message, duration };

    setToasts(prev => [...prev, toast]);

    return id;
  }, []);

  const hideToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // Make showToast available globally
  if (typeof window !== 'undefined') {
    (window as any).showToast = showToast;
  }

  return (
    <div className={`fixed top-4 right-4 z-50 space-y-2 ${className}`}>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          duration={toast.duration}
          onClose={() => hideToast(toast.id)}
        />
      ))}
    </div>
  );
}
