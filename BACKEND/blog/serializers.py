from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers

class RegistrationSerializer(RegisterSerializer):
    first_name = serializers.CharField(
        max_length = 16,
    )
    def clean_first_name(self,username):
        username = username.replace(" ","")
        return username
    def get_cleaned_data(self):
        return super().get_cleaned_data()
        