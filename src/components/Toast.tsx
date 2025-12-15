import React, { useEffect } from 'react';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string;
  subMessage?: string;
  visible: boolean;
  onHide: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  subMessage,
  visible,
  onHide,
  duration = 2000,
}) => {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onHide, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onHide]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50 px-6">
      <div className="bg-card text-card-foreground px-6 py-4 rounded-2xl 
        flex items-center gap-3 shadow-lg animate-scale-in">
        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
          <Check className="w-4 h-4 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="font-medium">{message}</span>
          {subMessage && (
            <span className="text-sm text-muted-foreground">{subMessage}</span>
          )}
        </div>
      </div>
    </div>
  );
};

// Hook for easy toast usage
export const useToastState = () => {
  const [toast, setToast] = React.useState({ visible: false, message: '', subMessage: '' });

  const showToast = (message: string, subMessage?: string) => {
    setToast({ visible: true, message, subMessage: subMessage || '' });
  };

  const hideToast = () => {
    setToast({ visible: false, message: '', subMessage: '' });
  };

  return { toast, showToast, hideToast };
};
