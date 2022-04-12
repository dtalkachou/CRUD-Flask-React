import json
from re import S
from typing import Dict, List, Optional, Tuple, Union

from flask import request, Response, jsonify
from requests import codes
from werkzeug.exceptions import BadRequest, NotFound

from backend.extensions import db
from backend.schemas import (
    FullShipmentSchema,
    PublicShipmentSchema,
    ShipmentUpdateSchema,
)
from backend.models import Shipment
from .base import BaseResource


class ShipmentManager:
    @staticmethod
    def get_shipment_by_id(shipment_id: int) -> Shipment:
        shipment: Shipment = Shipment.query.filter_by(id=shipment_id).first()
        if not shipment:
            raise NotFound(
                'Shipment with this id does not exists'
            )

        return shipment


class ShipmentResource(BaseResource):
    def post(self) -> Tuple[Response, int]:
        json_data: Dict = request.get_json(force=True)

        errors: Dict = PublicShipmentSchema().validate(json_data)
        if errors:
            raise BadRequest(errors)

        shipment: Shipment = Shipment(
            title=json_data.get('title'),
            weight=json_data.get('weight'),
            address=json_data.get('address'),
            shipper=json_data.get('shipper'),
        )

        db.session.add(shipment)
        db.session.commit()

        return jsonify(FullShipmentSchema().dump(shipment)), codes.CREATED

    def _list(self) -> Response:
        shipments: List[Shipment] = Shipment.query.all()
        return jsonify(FullShipmentSchema(many=True).dump(shipments))
    
    def _retrieve(self, shipment_id: int) -> Response:
        shipment: Shipment = ShipmentManager.get_shipment_by_id(shipment_id)
        return jsonify(FullShipmentSchema().dump(shipment))

    def get(self, shipment_id: Optional[int] = None) -> Response:
        if shipment_id:
            return self._retrieve(shipment_id)

        return self._list()

    def _update(
        self,
        schema: Union[PublicShipmentSchema, ShipmentUpdateSchema],
        shipment_id: int
    ) -> Tuple[Response, int]:
        json_data: Dict = request.get_json(force=True)

        errors: Dict = schema().validate(json_data)
        if errors:
            raise BadRequest(errors)

        shipment: Shipment = ShipmentManager.get_shipment_by_id(shipment_id)
        for key, value in json_data.items():
            setattr(shipment, key, value)
        
        db.session.commit()

        return jsonify(FullShipmentSchema().dump(shipment))

    def put(self, shipment_id: int) -> Tuple[Response, int]:
        return self._update(PublicShipmentSchema, shipment_id)

    def patch(self, shipment_id: int) -> Tuple[Response, int]:
        return self._update(ShipmentUpdateSchema, shipment_id)

    def delete(self, shipment_id: int) -> Response:
        shipment: Shipment = ShipmentManager.get_shipment_by_id(shipment_id)

        db.session.delete(shipment)
        db.session.commit()

        return Response(status=codes.NO_CONTENT)
