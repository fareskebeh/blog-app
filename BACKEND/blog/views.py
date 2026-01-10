from rest_framework.response import Response
from allauth.account.models import EmailConfirmation, EmailConfirmationHMAC
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

class Confirmation(APIView):
    permission_classes=[AllowAny]
    def get(self,request,key,*args,**kwargs):
        conf = EmailConfirmationHMAC.from_key(key) or EmailConfirmation.objects.filter(key=key).first()
        if not conf:
            return Response({"detail":"Invalid or expired link"}, status=400)
        conf.confirm(request)
        return Response({"detail":"Email confirmed!"}, status=200)
        