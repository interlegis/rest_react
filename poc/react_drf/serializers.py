from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *
from .search_indexes import ArquivoIndex
from drf_haystack.serializers import HaystackSerializer
import magic
import PyPDF2

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

class ArquivoSerializer(serializers.ModelSerializer):
    pdf = serializers.FileField(max_length=None, allow_empty_file=False)
    content = serializers.HiddenField(default=False)
    class Meta:
        model = Arquivo
        fields = ('nome','pdf','content',)
        readonly_fields = ('uploaded_at',)

    def validate_pdf(self, pdf):
        # import ipdb; ipdb.set_trace()
        validate_pdf = self.context.get('request').data.get('pdf')
        if magic.from_buffer(validate_pdf.read(), mime=True) == 'application/pdf':
            return pdf
        else:
            raise serializers.ValidationError('O campo deve ser no formato pdf')

    def validate_content(self, content):
        # import ipdb; ipdb.set_trace()
        content = '';
        for i in range(0 , PyPDF2.PdfFileReader(self.context.get('request').data.get('pdf')).getNumPages()):
             pdf_content = PyPDF2.PdfFileReader(self.context.get('request').data.get('pdf')).getPage(i).extractText()
             content = content + pdf_content.replace('\n','')
        return content

class ArquivoSearchSerializer(HaystackSerializer):
    class Meta:
        index_classes = [ArquivoIndex]
        fields = ('nome','content',)

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
