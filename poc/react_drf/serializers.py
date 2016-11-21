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
        fields = ('username','groups')

class PostLocalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Local
        fields = ('nome','cidade','estado','habitantes',)

class LocalSerializer(serializers.ModelSerializer):
    metropole = serializers.HiddenField(default=False)
    class Meta:
        model = Local
        fields = ('nome','cidade','estado','habitantes','metropole')

    def validate_metropole(self, metropole):
        # import ipdb; ipdb.set_trace()
        habitantes = self.context.get('request').data.get('habitantes')

        if habitantes > 1000:
            metropole = True
        else:
            metropole = False

        return metropole
