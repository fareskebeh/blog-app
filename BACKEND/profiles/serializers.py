from rest_framework import serializers
from .models import Profile, Preferences

class ProfileInfo(serializers.ModelSerializer):
    user = serializers.CharField(source="user.username", read_only=True)
    class Meta:
        model = Profile
        fields = ["avatar","user"]

class PreferencesSerializer(serializers.ModelSerializer):
    class Meta: 
        model= Preferences
        fields="__all__"