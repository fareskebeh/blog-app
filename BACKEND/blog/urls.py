from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from dj_rest_auth.views import PasswordResetView, PasswordResetConfirmView
from .views import Confirmation


urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/password/reset/', PasswordResetView.as_view()),
    path('auth/registration/account-confirm-email/<str:key>/', Confirmation.as_view()),
    path('auth/password/reset/confirm/<str:uidb64>/<str:token>/', PasswordResetConfirmView.as_view(), name="password_reset_confirm"),
    path('auth/registration/', include('dj_rest_auth.registration.urls')),
    path("", include("api.urls"))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
