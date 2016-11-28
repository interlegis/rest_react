from django.contrib import admin

# Register your models here.
from react_drf.models import *

admin.site.register(Produtos)
admin.site.register(Local)
admin.site.register(Arquivo)
admin.site.register(Fornecedores)
