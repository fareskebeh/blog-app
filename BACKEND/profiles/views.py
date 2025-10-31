from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from .models import Profile
from django.shortcuts import get_object_or_404
from .serializers import ProfileInfo, PreferencesSerializer

@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_avatar(request):
    try: 
        profile = request.user.profile
        new_avatar = request.FILES.get("new_avatar")
        if new_avatar:
            profile.avatar = new_avatar
            profile.save()
            return Response({"success": "Avatar updated successfully!"}, status=status.HTTP_200_OK)
        else:
            return Response({"error":"No avatar included in the request"}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@api_view(["GET"])
@permission_classes([AllowAny])
def profile_info(request, pk):
    profile = get_object_or_404(Profile, pk=pk)
    prof_ser = ProfileInfo(profile, many=False)
    
    return Response(prof_ser.data, status=status.HTTP_200_OK)
    


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_preferences(request):
    preferences = request.user.user_profile.user_prefs
    prefs_ser = PreferencesSerializer(preferences)
    return Response(prefs_ser.data, status=status.HTTP_202_ACCEPTED)