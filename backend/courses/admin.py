from django.contrib import admin
from .models import Course, Lesson

# Регистрация моделей в админке
admin.site.register(Course)
admin.site.register(Lesson)