from django.urls import path
from . import views

urlpatterns = [
    path("posts", views.post_list),
    path("post/<str:pk>/", views.review_post),
    path("post/<str:pk>/comment", views.comment),
    path("latest", views.latest),
    path("search", views.search),
    path("save", views.save_post),
    path("saved",views.get_saved)
]   