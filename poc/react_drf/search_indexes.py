from django.utils import timezone
from haystack import indexes
from .models import Arquivo


class ArquivoIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    nome = indexes.CharField(model_attr='nome')
    content = indexes.CharField(model_attr='content')

    def get_model(self):
        return Arquivo

    def index_queryset(self, using=None):
        """Used when the entire index for model is updated."""
        return self.get_model().objects.all()
