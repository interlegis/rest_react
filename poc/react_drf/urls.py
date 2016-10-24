from django.conf.urls import url

from . import views

urlpatterns = [
    # ex: /polls/
    url(r'^$', views.index, name='index'),
    url(r'produtos', views.produtos, name='produtos'),
    url(r'fornecedores', views.fornecedores, name='fornecedores'),
]
