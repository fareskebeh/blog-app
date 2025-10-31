from django.urls import path
from . import views
urlpatterns = [
    path("update-avatar/", views.update_avatar),
    path("info/<str:pk>", views.profile_info),
    path("preferences/", views.get_preferences)
]