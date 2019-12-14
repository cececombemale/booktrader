from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry
from .models import Book, Listing


@registry.register_document
class BookDocument(Document):
    listing = fields.NestedField(properties={
        'condition': fields.TextField(),
        'price': fields.FloatField(),
        'added_at': fields.DateField(),
        'user' : fields.NestedField(properties={
                'first_name': fields.TextField(),
                'last_name': fields.TextField(),
                'email': fields.TextField()
                })
    })

    class Index:
        # Name of the Elasticsearch index
        name = 'books'
        # See Elasticsearch Indices API reference for available settings
        settings = {'number_of_shards': 1,
                    'number_of_replicas': 0}

    class Django:
        model = Book # The model associated with this Document

        # The fields of the model you want to be indexed in Elasticsearch
        fields = [
            'title',
            'isbn',
            'author',
            'edition',
        ]

        related_models = [Listing]