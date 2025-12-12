# api/views.py - ПОЛНЫЙ ФАЙЛ СО ВСЕМИ ЭНДПОИНТАМИ
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from courses.models import Course, Lesson
from datetime import datetime
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.middleware.csrf import get_token
from django.http import JsonResponse

# ===== ТЕСТОВЫЙ ENDPOINT =====
@api_view(['GET'])
@permission_classes([AllowAny])
def test_endpoint(request):
    """Тестовый endpoint для проверки работы API"""
    return Response({
        'success': True,
        'message': 'API работает!',
        'timestamp': str(datetime.now())
    })

@api_view(['GET'])
@permission_classes([AllowAny])
def get_csrf_token(request):
    """Получить CSRF токен"""
    token = get_token(request)
    return Response({'csrfToken': token})

# ===== АУТЕНТИФИКАЦИЯ =====
@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def register_view(request):
    """Регистрация пользователя"""
    try:
        data = request.data
        
        email = data.get('email', '')
        password = data.get('password', '')
        username = data.get('username', email.split('@')[0])
        
        if not email or not password:
            return Response({'success': False, 'error': 'Email и пароль обязательны'}, 
                           status=status.HTTP_400_BAD_REQUEST)
        
        if len(password) < 6:
            return Response({'success': False, 'error': 'Пароль должен быть минимум 6 символов'}, 
                           status=status.HTTP_400_BAD_REQUEST)
        
        # Проверка существования пользователя
        if User.objects.filter(email=email).exists():
            return Response({'success': False, 'error': 'Пользователь с таким email уже существует'}, 
                           status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(username=username).exists():
            return Response({'success': False, 'error': 'Пользователь с таким именем уже существует'}, 
                           status=status.HTTP_400_BAD_REQUEST)
        
        # Создание пользователя
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )
        
        # Автоматический вход
        login(request, user)
        
        return Response({
            'success': True,
            'message': 'Регистрация успешна!',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
            }
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response({'success': False, 'error': str(e)}, 
                       status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def login_view(request):
    """Вход пользователя"""
    try:
        data = request.data
        
        email = data.get('email', '')
        password = data.get('password', '')
        
        if not email or not password:
            return Response({'success': False, 'error': 'Email и пароль обязательны'}, 
                           status=status.HTTP_400_BAD_REQUEST)
        
        # Ищем пользователя по email
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'success': False, 'error': 'Неверный email или пароль'}, 
                           status=status.HTTP_400_BAD_REQUEST)
        
        # Аутентификация
        user = authenticate(username=user.username, password=password)
        
        if user is not None and user.is_active:
            login(request, user)
            return Response({
                'success': True,
                'message': 'Вход выполнен успешно!',
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                }
            })
        else:
            return Response({'success': False, 'error': 'Неверный email или пароль'}, 
                           status=status.HTTP_400_BAD_REQUEST)
            
    except Exception as e:
        return Response({'success': False, 'error': str(e)}, 
                       status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """Выход пользователя"""
    logout(request)
    return Response({'success': True, 'message': 'Выход выполнен успешно'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_info_view(request):
    """Информация о текущем пользователе"""
    return Response({
        'success': True,
        'user': {
            'id': request.user.id,
            'username': request.user.username,
            'email': request.user.email,
        }
    })

# ===== КУРСЫ =====
@api_view(['GET'])
@permission_classes([AllowAny])
def courses_list(request):
    """Список курсов"""
    try:
        courses = Course.objects.all()
        data = []
        for course in courses:
            data.append({
                'id': course.id,
                'title': course.title,
                'description': course.description,
                'created_at': course.created_at
            })
        
        return Response({
            'success': True,
            'courses': data,
            'count': len(data)
        })
    except Exception as e:
        return Response({'success': False, 'error': str(e)}, 
                       status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])
def course_detail(request, pk):
    """Детали курса"""
    try:
        course = Course.objects.get(id=pk)
        return Response({
            'success': True,
            'course': {
                'id': course.id,
                'title': course.title,
                'description': course.description,
                'created_at': course.created_at
            }
        })
    except Course.DoesNotExist:
        return Response({'success': False, 'error': 'Курс не найден'}, 
                       status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'success': False, 'error': str(e)}, 
                       status=status.HTTP_400_BAD_REQUEST)

# ===== УРОКИ =====
@api_view(['GET'])
@permission_classes([AllowAny])
def lessons_list(request):
    """Список уроков"""
    try:
        lessons = Lesson.objects.all()
        data = []
        for lesson in lessons:
            data.append({
                'id': lesson.id,
                'title': lesson.title,
                'course_id': lesson.course.id if lesson.course else None,
                'created_at': lesson.created_at
            })
        
        return Response({
            'success': True,
            'lessons': data,
            'count': len(data)
        })
    except Exception as e:
        return Response({'success': False, 'error': str(e)}, 
                       status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])
def lesson_detail(request, pk):
    """Детали урока"""
    try:
        lesson = Lesson.objects.get(id=pk)
        return Response({
            'success': True,
            'lesson': {
                'id': lesson.id,
                'title': lesson.title,
                'course_id': lesson.course.id if lesson.course else None,
                'content': lesson.content,
                'created_at': lesson.created_at
            }
        })
    except Lesson.DoesNotExist:
        return Response({'success': False, 'error': 'Урок не найден'}, 
                       status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'success': False, 'error': str(e)}, 
                       status=status.HTTP_400_BAD_REQUEST)