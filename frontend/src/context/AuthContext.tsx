// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Типы
interface User {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User, token?: string) => void;
  logout: () => void;
  loading: boolean;
}

// Создаем контекст с начальным значением undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Создаем провайдер
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // При загрузке приложения проверяем, есть ли сохраненная сессия
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const savedUser = localStorage.getItem('user');
      const isAuth = localStorage.getItem('isAuthenticated');
      const token = localStorage.getItem('access_token');

      if (savedUser && (isAuth === 'true' || token)) {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Ошибка при проверке аутентификации:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = (userData: User, token?: string) => {
    setUser(userData);
    setIsAuthenticated(true);
    
    // Сохраняем в localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isAuthenticated', 'true');
    
    if (token) {
      localStorage.setItem('access_token', token);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    
    // Очищаем localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    
    // Опционально: вызываем API logout на бэкенде
    fetch('http://localhost:8001/api/auth/logout/', {
      method: 'POST',
      credentials: 'include',
    }).catch(console.error);
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Создаем хук для использования контекста
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Экспортируем контекст для редких случаев прямого использования
export default AuthContext;