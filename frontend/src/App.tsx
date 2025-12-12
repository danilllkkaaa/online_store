import React, { useState } from "react";
import "./index.css";
import AuthModal from "./components/AuthModal";

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const handleLoginClick = () => {
    setAuthMode("login");
    setIsAuthModalOpen(true);
  };

  const handleRegisterClick = () => {
    setAuthMode("register");
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ===== НАВИГАЦИЯ ===== */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Логотип */}
            <div className="flex items-center">
              <div className="text-2xl font-bold text-blue-600">🚀 SkillMaster</div>
            </div>

            {/* Меню навигации */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#courses" className="text-gray-700 hover:text-blue-600 font-medium">
                Курсы
              </a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium">
                О школе
              </a>
              <a href="#reviews" className="text-gray-700 hover:text-blue-600 font-medium">
                Отзывы
              </a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium">
                Контакты
              </a>
            </div>

            {/* Кнопки входа/регистрации */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleLoginClick}
                className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                Вход
              </button>
              <button 
                onClick={handleRegisterClick}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Регистрация
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== ГЕРОЙ СЕКЦИЯ ===== */}
      <header className="relative bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Онлайн-школа <span className="text-blue-600">SkillMaster</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Профессиональное обучение программированию, дизайну и маркетингу. 
              Практические навыки для реальных проектов.
            </p>
            <div className="space-x-4">
              <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-lg">
                Начать обучение
              </button>
              <button className="px-8 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 font-semibold text-lg">
                Посмотреть курсы
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ===== О ШКОЛЕ ===== */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Чему я учу</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Моя миссия — делать сложные темы доступными и практичными
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Карточка 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="text-blue-500 text-4xl mb-4">💻</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Программирование</h3>
              <p className="text-gray-600 mb-4">
                Python, JavaScript, React, Django. От основ до продвинутых тем. 
                Реальные проекты и код-ревью.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Web-разработка</li>
                <li>• Мобильные приложения</li>
                <li>• Автоматизация</li>
              </ul>
            </div>

            {/* Карточка 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="text-green-500 text-4xl mb-4">🎨</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Дизайн</h3>
              <p className="text-gray-600 mb-4">
                UI/UX дизайн, Figma, Adobe Suite. Создание интерфейсов 
                которые нравятся пользователям.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Веб-дизайн</li>
                <li>• Мобильный дизайн</li>
                <li>• Прототипирование</li>
              </ul>
            </div>

            {/* Карточка 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="text-purple-500 text-4xl mb-4">📈</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Маркетинг</h3>
              <p className="text-gray-600 mb-4">
                Digital-маркетинг, SMM, контент-стратегии. Как продвигать 
                продукты в digital-среде.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• SEO оптимизация</li>
                <li>• Таргетированная реклама</li>
                <li>• Аналитика</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ПРЕИМУЩЕСТВА ===== */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Почему выбирают меня</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-700">Выпускников</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
              <div className="text-gray-700">Часов видео</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-700">Поддержка</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-700">Довольных студентов</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== КАК ПРОХОДИТ ОБУЧЕНИЕ ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Как проходит обучение</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Теория</h3>
              <p className="text-gray-600 text-sm">Короткие видеоуроки</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Практика</h3>
              <p className="text-gray-600 text-sm">Реальные задания</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👨‍🏫</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Проверка</h3>
              <p className="text-gray-600 text-sm">Разбор ошибок</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Результат</h3>
              <p className="text-gray-600 text-sm">Портфолио проектов</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ПОДВАЛ ===== */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">SkillMaster</div>
              <p className="text-gray-400">
                Онлайн-школа практических навыков для digital-профессий.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Курсы</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Программирование</a></li>
                <li><a href="#" className="hover:text-white">Дизайн</a></li>
                <li><a href="#" className="hover:text-white">Маркетинг</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">О школе</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">О преподавателе</a></li>
                <li><a href="#" className="hover:text-white">Отзывы</a></li>
                <li><a href="#" className="hover:text-white">Контакты</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@skillmaster.ru</li>
                <li>Телефон: +7 (999) 123-45-67</li>
                <li>Telegram: @skillmaster</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 SkillMaster. Все права защищены.</p>
          </div>
        </div>
      </footer>

      {/* МОДАЛЬНОЕ ОКНО АВТОРИЗАЦИИ */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={() => setAuthMode(authMode === "login" ? "register" : "login")}
      />
    </div>
  );
}

export default App;
