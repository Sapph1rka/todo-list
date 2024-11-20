from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from .models import CustomUser as User
from .serializers import UserSerializer

class RegisterView(APIView):   
    def post(self, request):
        # Отримуємо дані з запиту
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        # Перевірка на відсутність обов'язкових полів
        if not username or not email or not password:
            return Response('We need labels, boss!', status=status.HTTP_400_BAD_REQUEST)

        # Додавання валідації через серіалізатор
        user_data = {
            'username': username,
            'email': email,
            'password': password
        }

        # Використовуємо серіалізатор для перевірки даних
        serializer = UserSerializer(data=user_data)
        
        if serializer.is_valid():  # Якщо дані валідні
            # Створюємо користувача через серіалізатор
            serializer.save()  # Серіалізатор сам згенерує хешований пароль і збереження користувача
            return Response('User registered successfully!', status=status.HTTP_201_CREATED)
        else:
            # Якщо серіалізатор не валідний, повертаємо помилки
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):   
    def post(self, request):
        # Отримуємо дані з запиту
        username = request.data.get('username')
        password = request.data.get('password')

        # Перевірка на відсутність обов'язкових полів
        if not username or not password:
            return Response({'detail': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        # Аутентифікація користувача
        user = authenticate(username=username, password=password)

        if user is not None:
            # Якщо аутентифікація успішна, генеруємо токени
            refresh = RefreshToken.for_user(user)
            access_token = refresh.access_token

            return Response({
                'refresh': str(refresh),
                'access': str(access_token),
            }, status=status.HTTP_200_OK)
        else:
            # Якщо аутентифікація не пройшла, повертаємо помилку
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

