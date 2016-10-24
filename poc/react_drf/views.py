from rest_framework import viewsets
from django.shortcuts import render
from .models import *
from .serializers import *
# Create your views here.

class ProdutosViewSet(viewsets.ModelViewSet):
    queryset = Produtos.objects.all()
    serializer_class =  ProdutosSerializer

class FornecedoresViewSet(viewsets.ModelViewSet):
    queryset = Fornecedores.objects.all()
    serializer_class = FornecedoresSerializer

def index(request):
    return render(request, 'react_drf/index.html')

def produtos(request):
    return render(request, 'react_drf/produtos.html')

def fornecedores(request):
    return render(request, 'react_drf/fornecedores.html')
