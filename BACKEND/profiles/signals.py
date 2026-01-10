from allauth.account.signals import email_confirmed
from django.dispatch import receiver
from .models import Profile, Preferences

@receiver(email_confirmed)
def create_profile(request,email_address,**kwargs):
    user = email_address.user
    profile,_= Profile.objects.get_or_create(user=user)
    Preferences.objects.get_or_create(profile=profile)