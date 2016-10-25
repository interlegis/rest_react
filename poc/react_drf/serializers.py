from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class ProdutosSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Produtos
        fields = ('nome', 'valor')


class FornecedoresSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Fornecedores
        fields = ('nome',)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)
