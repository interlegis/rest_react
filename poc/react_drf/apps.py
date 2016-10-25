from __future__ import unicode_literals

from django.apps import AppConfig


class ReactDrfConfig(AppConfig):
    name = 'react_drf'

    def ready(self):
        from . import signals
