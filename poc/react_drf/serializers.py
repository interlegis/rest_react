from rest_framework import serializers
from .models import *

class ProdutosSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Produtos
        fields = ('nome', 'valor')


class FornecedoresSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Fornecedores
        fields = ('nome',)
