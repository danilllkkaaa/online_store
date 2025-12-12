from django.db import models
from django.contrib.auth import get_user_model
from courses.models import Lesson

User = get_user_model()

class UserProgress(models.Model):
    STATUS_CHOICES = [
        ('not_started', 'Не начат'),
        ('in_progress', 'В процессе'),
        ('completed', 'Завершен'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='not_started')
    video_progress = models.IntegerField(default=0)  # секунда остановки
    completed_at = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ['user', 'lesson']
    
    def __str__(self):
        return f"{self.user.username} - {self.lesson.title} ({self.status})"