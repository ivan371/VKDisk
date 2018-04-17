# -*- coding: utf-8 -*-

from __future__ import (absolute_import, division, print_function, unicode_literals)
from elasticsearch_dsl import (
    DocType,
    Date,
    Keyword,
    Text,
    Integer,
    Object
)


class DocumentIndex(DocType):
    id = Integer(fields={'raw': Keyword()})
    text = Text(analyzer='snowball', fields={'raw': Keyword()})
    title = Text(analyzer='snowball', fields={'raw': Keyword()})
    author = Object(
        properties={
            'id': Integer(fields={'raw': Keyword()}),
        }
    )
    folder = Object(
        properties={
            'id': Integer(fields={'raw': Keyword()}),
            'title': Text(analyzer='snowball', fields={'raw': Keyword()}),
            'typeForElasticSearchPleaseDontTouchMe': Text(analyzer='snowball', fields={'raw': Keyword()}),
        }
    )

    created = Date()

    class Meta:
        index = 'document'


# TODO: Раскоменти при первом запуске и закоменть обратно
# from elasticsearch import Elasticsearch, RequestsHttpConnection
# DocumentIndex.init(using=Elasticsearch(hosts=['localhost:9200/'], connection_class=RequestsHttpConnection))