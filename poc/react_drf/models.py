from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Produtos(models.Model):
    nome = models.CharField(blank=True, max_length=100)
    valor = models.DecimalField(max_digits=10, decimal_places=2)

class Fornecedores(models.Model):
    nome = models.CharField(blank=True, max_length=100)
