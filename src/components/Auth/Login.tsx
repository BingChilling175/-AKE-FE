import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter, Input, Alert, Button } from '../ui';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onClose?: () => void;
  onSwitchMode?: () => void;
}

const Login = ({ onClose, onSwitchMode }: LoginProps) => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const canSubmit = form.username.trim() !== '' && form.password.trim() !== '';
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) {
      setError('Hãy nhập đầy đủ thông tin!');
      return;
    }
    setError('');
    // Gọi login context, truyền user mock (có thể mở rộng info nếu muốn)
    login({ username: form.username });
    if (onClose) onClose();
    navigate('/chat');
  };

  return (
    <Card className="relative w-full max-w-sm rounded-xl p-8 shadow-xl pt-8">
      {onClose && (
        <button
          className="absolute right-2 top-2 text-xl w-8 h-8 flex items-center justify-center rounded hover:bg-muted z-10"
          onClick={onClose}
          aria-label="Close modal"
          type="button"
        >
          ×
        </button>
      )}
      <form onSubmit={handleSubmit}>
        <CardHeader className="p-0 pt-2 mb-4 text-center">
          <h1 className="text-xl font-semibold tracking-normal">Đăng nhập</h1>
        </CardHeader>
        <CardContent className="space-y-4 p-0">
          <Input
            type="text"
            name="username"
            placeholder="Tên đăng nhập"
            value={form.username}
            onChange={handleChange}
            autoFocus
          />
          <Input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={form.password}
            onChange={handleChange}
          />
          {error && <Alert>{error}</Alert>}
        </CardContent>
        <CardFooter className="flex flex-col gap-2 pt-4 px-0">
          <Button
            type="submit"
            className="!w-full !h-14 !rounded-full !bg-black !text-white hover:!bg-neutral-900 active:!bg-neutral-800 !px-8 flex items-center justify-center text-base select-none !shadow-none !border-none !opacity-100"
            style={{boxShadow: 'none', border: 'none'}}
          >
            <span className="font-semibold select-none">Đăng nhập</span>
          </Button>
          <div className="text-center text-sm text-muted-foreground mt-2">
            Chưa có tài khoản?{' '}
            <a href="#" onClick={(e) => {e.preventDefault(); onSwitchMode && onSwitchMode();}} className="text-primary font-medium hover:underline">Đăng ký</a>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Login;
