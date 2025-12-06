import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter, Input, Alert, Button } from '../ui';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface RegisterProps {
  onClose?: () => void;
  onSwitchMode?: () => void;
}

const Register = ({ onClose, onSwitchMode }: RegisterProps) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    date: '',
  });
  const [error, setError] = useState('');
  const canSubmit = !!form.firstName && !!form.lastName && !!form.username && !!form.password && !!form.email;
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) {
      setError('Hãy nhập đầy đủ thông tin bắt buộc!');
      return;
    }
    setError('');
    login({
      username: form.username,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      avatar: undefined,
    });
    if (onClose) onClose();
    navigate('/chat');
  };

  return (
    <Card className="relative w-full max-w-md rounded-xl p-10 shadow-xl pt-8">
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
        <CardHeader className="p-0 pt-1 mb-4 text-center">
          <h1 className="text-xl font-semibold tracking-normal">Đăng ký</h1>
        </CardHeader>
        <CardContent className="space-y-3 p-0">
          <div className="flex gap-2">
            <Input
              type="text"
              name="lastName"
              placeholder="Họ"
              value={form.lastName}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="firstName"
              placeholder="Tên"
              value={form.firstName}
              onChange={handleChange}
            />
          </div>
          <Input
            type="text"
            name="username"
            placeholder="Tên đăng nhập"
            value={form.username}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={form.password}
            onChange={handleChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <Input
            type="tel"
            name="phone"
            placeholder="Số điện thoại (tuỳ chọn)"
            value={form.phone}
            onChange={handleChange}
          />
          <Input
            type="date"
            name="date"
            placeholder="Ngày sinh (tuỳ chọn)"
            value={form.date}
            onChange={handleChange}
          />
          {error && <Alert>{error}</Alert>}
        </CardContent>
        <CardFooter className="flex flex-col gap-2 mt-4 px-0">
          <Button
            type="submit"
            className="!w-full !h-14 !rounded-full !bg-black !text-white hover:!bg-neutral-900 active:!bg-neutral-800 !px-8 flex items-center justify-center text-base select-none !shadow-none !border-none !opacity-100"
            style={{boxShadow: 'none', border: 'none'}}
          >
            <span className="font-semibold select-none">Đăng ký</span>
          </Button>
          <div className="text-center text-sm text-muted-foreground mt-2">
            Đã có tài khoản?{' '}
            <a href="#" onClick={(e) => {e.preventDefault(); onSwitchMode && onSwitchMode();}} className="text-primary font-medium hover:underline">Đăng nhập</a>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Register;
