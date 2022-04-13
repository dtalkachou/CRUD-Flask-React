from marshmallow import validate
from marshmallow_sqlalchemy import auto_field

from .extensions import ma
from .models import Shipment


class ShipmentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Shipment

    id = auto_field(dump_only=True)
    weight = auto_field(validate=validate.Range(min=0))
    sent_at = auto_field(dump_only=True)


class OptionalShipmentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Shipment
        exclude = ('id', 'sent_at')

    title = auto_field(required=False)
    weight = auto_field(validate=validate.Range(min=0), required=False)
