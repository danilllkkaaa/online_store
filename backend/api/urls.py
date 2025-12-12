# api/urls.py - ИСПРАВЛЕННАЯ ВЕРСИЯ
from django.urls import path
from . import views

urlpatterns = [
    # Тестовый endpoint
    path('csrf/', views.get_csrf_token, name='csrf'),
    path('test/', views.test_endpoint, name='test'),
    
    # Аутентификация
    path('auth/register/', views.register_view, name='register'),
    path('auth/login/', views.login_view, name='login'),
    path('auth/logout/', views.logout_view, name='logout'),
    path('auth/user/', views.user_info_view, name='user_info'),
    
    # Простые endpoints вместо ViewSets
    path('courses/', views.courses_list, name='courses_list'),
    path('courses/<int:pk>/', views.course_detail, name='course_detail'),
    path('lessons/', views.lessons_list, name='lessons_list'),
    path('lessons/<int:pk>/', views.lesson_detail, name='lesson_detail'),
]