import json
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth.tokens import default_token_generator
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token

@csrf_exempt
def signup_api(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username, email = data.get('username'), data.get('email')
            password, re_password = data.get('password'), data.get('re_password')

            if password != re_password:
                return JsonResponse({'error': 'Passwords do not match'}, status=400)
            if User.objects.filter(username=username).exists():
                return JsonResponse({'error': 'Username taken'}, status=400)

            user = User.objects.create_user(username=username, email=email, password=password)
            user.is_active = False
            user.save()

            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            activation_link = f"http://localhost:5173/activate/{uid}/{token}"

            send_mail("Activate Account", f"Link: {activation_link}", settings.EMAIL_HOST_USER, [user.email])
            return JsonResponse({'message': 'Check email!'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
def login_api(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        user = authenticate(username=data.get('username'), password=data.get('password'))
        if user and user.is_active:
            token, _ = Token.objects.get_or_create(user=user)
            return JsonResponse({'token': token.key, 'username': user.username})
        return JsonResponse({'error': 'Invalid or inactive account'}, status=400)

@csrf_exempt
def activate_api(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        try:
            uid = force_str(urlsafe_base64_decode(data.get('uid')))
            user = User.objects.get(pk=uid)
            if default_token_generator.check_token(user, data.get('token')):
                user.is_active = True
                user.save()
                return JsonResponse({'message': 'Activated!'})
        except: pass
        return JsonResponse({'error': 'Invalid link'}, status=400)