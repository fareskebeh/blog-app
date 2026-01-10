from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="user_profile")
    avatar= models.ImageField(upload_to="avatars/")    
    birth_date = models.DateField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.user.username}'s Profile"
    
class Preferences(models.Model):
    THEMES = [
        ("d", "Dark"),
        ("l", "Light")
    ]
    LANGUAGES = [
        ("en","English"),
        ("fr","French"),
        ("de","Deutsch"),
        ("es","Español"),
        ("it","Italiano"),
        ("pt","Português"),
        ("ru","Русский"),
        ("ja","日本語"),
        ("zh","中文"),
        ("ar","العربية"),
        ("hi","हिंदी"),
    ]

    theme = models.CharField(choices=THEMES, default="d")
    language = models.CharField(choices=LANGUAGES, default="en")
    email_notifications = models.BooleanField(default=False)
    push_notifications = models.BooleanField(default=True)
    is_private = models.BooleanField(default=False)
    two_fa_enabled = models.BooleanField(default=False)
    profile = models.OneToOneField(Profile, on_delete= models.CASCADE, related_name="user_prefs")
    
    def __str__(self):
        return f"{self.profile.user.username} Preferences"