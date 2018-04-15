from django.db import models
from django.contrib import admin


# Create your models here.
class Task(models.Model):
    text = models.TextField()
    creation_date = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)
    completion_date = models.DateTimeField(auto_now_add=True)


admin.site.register(Task)
