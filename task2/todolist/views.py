from django import forms
from django.http import HttpResponseNotModified
from django.shortcuts import render, resolve_url
from django.views.generic import ListView, CreateView
from todolist.models import Task

# Create your views here.


class TaskListView(ListView):
    template_name = "list.html"
    model = Task


class TaskForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = ('text',)


class TaskAddView(CreateView):
    template_name = 'add_element.html'
    form_class = TaskForm

    def get_success_url(self):
        return resolve_url("list")


def complete_task(request):
    data = request.POST
    Task.objects.filter(id=data[u'task_id']).update(completed=data[u'completed'])
    return HttpResponseNotModified()