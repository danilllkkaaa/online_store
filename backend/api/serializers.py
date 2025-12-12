from rest_framework import serializers
from courses.models import Course, Lesson

class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = ['id', 'title', 'course']

class CourseSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True, source='lesson_set')
    
    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'lessons']
