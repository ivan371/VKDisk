# -*- coding: utf-8 -*-

from __future__ import (absolute_import, division, print_function, unicode_literals)
from elasticsearch_dsl import (
    DocType,
    Date,
    Keyword,
    Text,
    Integer
)


class DocumentIndex(DocType):
    pk = Integer()
    text = Text(fields={'raw': Keyword()})
    title = Text()
    created = Date()

    class Meta:
        index = 'document'
