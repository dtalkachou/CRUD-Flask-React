from marshmallow import validate
from marshmallow_sqlalchemy import auto_field

from .extensions import ma
from .models import Shipment


class FullShipmentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Shipment


class PublicShipmentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Shipment
        exclude = ('id', 'sent_at')

    weight = auto_field(validate=validate.Range(min=0))


class ShipmentUpdateSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Shipment
        exclude = ('id', 'sent_at')

    title = auto_field(required=False)
    weight = auto_field(validate=validate.Range(min=0), required=False)
