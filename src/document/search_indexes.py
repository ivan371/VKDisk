# -*- coding: utf-8 -*-

from __future__ import (absolute_import, division, print_function, unicode_literals)
from elasticsearch_dsl import (
    DocType,
    Date,
    Keyword,
    Text,
    Integer,
)


class DocumentIndex(DocType):
    id = Integer()
    text = Text(analyzer='snowball', fields={'raw': Keyword()})
    title = Text(analyzer='snowball', fields={'raw': Keyword()})
    created = Date()

    class Meta:
        index = 'document'


# TODO: Раскоменти при первом запуске и закоменть обратно
# from elasticsearch import Elasticsearch, RequestsHttpConnection
# DocumentIndex.init(using=Elasticsearch(hosts=['localhost:9200/'], connection_class=RequestsHttpConnection))