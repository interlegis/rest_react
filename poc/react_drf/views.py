from rest_framework import viewsets, response, permissions, authentication, status
from rest_framework.decorators import detail_route, list_route
from django.contrib.auth.models import User
from django.shortcuts import render
import datetime
from .models import *
from .serializers import *
from drf_haystack.viewsets import HaystackViewSet
from drf_haystack.filters import HaystackHighlightFilter
# Create your views here.

class ProdutosViewSet(viewsets.ModelViewSet):
    queryset = Produtos.objects.all()
    serializer_class =  ProdutosSerializer
    # permission_classes = (permissions.IsAuthenticated,)

class FornecedoresViewSet(viewsets.ModelViewSet):
    queryset = Fornecedores.objects.all()
    serializer_class = FornecedoresSerializer
    # permission_classes = (permissions.IsAuthenticated,)

class ArquivoViewSet(viewsets.ModelViewSet):
    queryset = Arquivo.objects.all()
    serializer_class = ArquivoSerializer

    def post(self, request, format=None):
        serializer = self.get_serializer(data=request.data,file=request.FILES)
        if serializer.is_valid():
            serializer.save()
            return response.Response(status=status.HTTP_200_CREATED)
        else:
            return response.Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        serializer = self.get_serializer(Arquivo.objects.order_by('uploaded_at'), many=True)
        return response.Response(serializer.data)

    # permission_classes = (permissions.IsAuthenticated,)
class ArquivoSearchView(HaystackViewSet):
    index_models = [Arquivo]
    serializer_class = ArquivoSearchSerializer

class UserViewVSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def retrieve(self, request, pk=None):
        if pk == 'i':
            return response.Response(UserSerializer(request.user,
                context={'request':request}).data)
        return super(UserViewSet, self).retrieve(request, pk)

class LocalViewSet(viewsets.ModelViewSet):
    queryset = Local.objects.all()
    serializer_class = LocalSerializer

    def list(self, request):
        serializer = self.get_serializer(Local.objects.all(), many=True)
        return response.Response(serializer.data)


    def post(self, request,pk=None):
        # import ipdb; ipdb.set_trace()
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return response.Response(status=status.HTTP_201_CREATED)
        else:
            return response.Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)
