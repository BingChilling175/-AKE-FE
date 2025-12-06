import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

interface AuthModalProps {
  show: boolean;
  mode: 'login' | 'register' | null;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ show, mode: initialMode, onClose }) => {
  const [mode, setMode] = useState<'login' | 'register' | null>(initialMode);

  React.useEffect(() => {
    setMode(initialMode); // reset khi modal mở lại
  }, [initialMode, show]);

  if (!show || !mode) return null;

  const handleSwitchMode = (target: 'login' | 'register') => setMode(target);

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} aria-label="close overlay" />
      <div className="relative z-10">
        {mode === 'login' ? (
          <Login onClose={onClose} onSwitchMode={() => handleSwitchMode('register')} />
        ) : (
          <Register onClose={onClose} onSwitchMode={() => handleSwitchMode('login')} />
        )}
      </div>
    </div>
  );
};

export default AuthModal;
