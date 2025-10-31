from rest_framework.serializers import ModelSerializer
from .models import Profile, Preferences

class ProfileInfo(ModelSerializer):
    class Meta:
        model = Profile
        fields = ["avatar","user"]

class PreferencesSerializer(ModelSerializer):
    class Meta: 
        model= Preferences
        fields="__all__"