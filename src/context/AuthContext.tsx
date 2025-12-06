import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Định nghĩa user (sau này BE trả gì thì sửa ở đây)
export type User = {
  username: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  dob?: Date | string;
};

interface AuthContextProps {
  user: User | null;
  login: (user: User) => void; // mock login (sau này sửa thành nhận {username, password})
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Fake login, về sau gọi BE ở đây
  const login = (user: User) => setUser(user);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
