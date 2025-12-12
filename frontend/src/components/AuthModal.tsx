// src/components/AuthModal.tsx
import React, { useState, useEffect } from "react";
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "login" | "register";
  onSwitchMode: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  mode, 
  onSwitchMode 
}) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [csrfToken, setCsrfToken] = useState("");

  // Получаем CSRF токен при открытии модалки
  useEffect(() => {
    if (isOpen) {
      getCsrfToken();
    }
  }, [isOpen]);

  const getCsrfToken = async () => {
    try {
      const response = await fetch('http://localhost:8001/api/csrf/', {
        method: 'GET',
        credentials: 'include', // Важно для получения cookie
      });
      
      if (response.ok) {
        const data = await response.json();
        setCsrfToken(data.csrfToken);
        console.log("CSRF токен получен:", data.csrfToken);
      } else {
        console.warn("Не удалось получить CSRF токен");
      }
    } catch (error) {
      console.error("Ошибка получения CSRF токена:", error);
    }
  };

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Валидация
    if (mode === "register") {
      if (formData.password !== formData.confirmPassword) {
        setError("Пароли не совпадают");
        setLoading(false);
        return;
      }
      if (formData.password.length < 6) {
        setError("Пароль должен быть минимум 6 символов");
        setLoading(false);
        return;
      }
    }

    try {
      const endpoint = mode === "login" 
        ? "http://localhost:8001/api/auth/login/" 
        : "http://localhost:8001/api/auth/register/";
      
      const payload = mode === "login" 
        ? { 
            email: formData.email, 
            password: formData.password 
          }
        : { 
            email: formData.email, 
            password: formData.password,
            username: formData.name || formData.email.split('@')[0]
          };

      console.log("Отправка запроса на:", endpoint);
      console.log("CSRF токен:", csrfToken);

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

    if (csrfToken) {
      headers["X-CSRFToken"] = csrfToken;
      console.log("CSRF токен добавлен в заголовки");
    } else {
      console.warn("CSRF токен отсутствует!");
    }    

      const response = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
        credentials: "include",  // Важно для сессий и cookie
      });

      const data = await response.json();
      console.log("Ответ от сервера:", data);
      console.log("Статус ответа:", response.status);

      console.log("Заголовки запроса:", headers);

      if (response.status >= 400) {
        throw new Error(data.error || data.detail || data.message || "Ошибка сервера");
      }

      // Проверяем успешность
      if (data.success !== true && !data.user) {
        throw new Error(data.error || "Неверный формат ответа");
      }

      // Успешная авторизация
      console.log("Успех! Данные пользователя:", data.user);
      
      const userData = {
        id: data.user?.id || Date.now(),
        username: data.user?.username || formData.name || formData.email.split('@')[0],
        email: data.user?.email || formData.email,
      };

      login(userData);

      alert(data.message || (mode === "login" ? "Вход выполнен успешно!" : "Регистрация успешна!"));
      onClose();
      
      setTimeout(() => {
        window.location.reload();
      }, 500);
      
    } catch (err: any) {
      console.error("Ошибка при авторизации:", err);
      setError(err.message || "Ошибка при отправке данных.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Заголовок */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            {mode === "login" ? "Вход в аккаунт" : "Создать аккаунт"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Форма */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {mode === "register" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Имя
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Введите ваше имя"
                required={mode === "register"}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="example@mail.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Пароль
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Минимум 6 символов"
              required
              minLength={6}
            />
          </div>

          {mode === "register" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Подтвердите пароль
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Повторите пароль"
                required={mode === "register"}
                minLength={6}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !csrfToken}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Загрузка...
              </span>
            ) : mode === "login" ? "Войти" : "Зарегистрироваться"}
          </button>

          {!csrfToken && (
            <div className="text-yellow-600 text-sm text-center">
              Получение токена безопасности...
            </div>
          )}

          <div className="text-center pt-4 border-t">
            <p className="text-gray-600">
              {mode === "login" ? "Еще нет аккаунта?" : "Уже есть аккаунт?"}
              <button
                type="button"
                onClick={onSwitchMode}
                className="ml-2 text-blue-600 hover:text-blue-700 font-semibold"
              >
                {mode === "login" ? "Зарегистрироваться" : "Войти"}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;