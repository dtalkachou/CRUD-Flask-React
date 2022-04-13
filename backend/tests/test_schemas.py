import copy
from datetime import datetime

import pytest

from backend.schemas import (
    ShipmentSchema,
    OptionalShipmentSchema,
)


@pytest.fixture
def shipment_payload():
    return  {
        'title': 'test-title',
        'weight': '12345.67',
        'address': 'test-address',
        'shipper': 'test-shipper',
    }


def test_shipment_schema_validate_successfully(shipment_payload):
    errors = ShipmentSchema().validate(shipment_payload)
    assert errors == {}


def test_public_shipment_schema_validate_successfully(shipment_payload):
    errors = ShipmentSchema().validate(shipment_payload)
    assert errors == {}


def test_shipment_schema_validate_returns_errors_when_title_does_not_contain(shipment_payload):
    payload = copy.deepcopy(shipment_payload)
    del payload['title']
    errors = ShipmentSchema().validate(payload)
    assert errors != {}


def test_shipment_schema_validate_returns_errors_when_weight_does_not_contain(shipment_payload):
    payload = copy.deepcopy(shipment_payload)
    del payload['weight']
    errors = ShipmentSchema().validate(payload)
    assert errors != {}


def test_optional_shipment_schema_validate_successfully_when_title_does_not_contain(shipment_payload):
    payload = copy.deepcopy(shipment_payload)
    del payload['title']
    errors = OptionalShipmentSchema().validate(payload)
    assert errors == {}


def test_optional_shipment_schema_validate_successfully_when_weight_does_not_contain(shipment_payload):
    payload = copy.deepcopy(shipment_payload)
    del payload['weight']
    errors = OptionalShipmentSchema().validate(payload)
    assert errors == {}


def test_shipment_schemas_validate_returns_errors_when_contains_read_only_attributes(shipment_payload):
    read_only_attrs_with_values = {
        'id': 1,
        'sent_at': datetime(1970, 1, 1).isoformat(),
    }
    for schemas in (ShipmentSchema, OptionalShipmentSchema):
        for attr, value in read_only_attrs_with_values.items():
            payload = copy.deepcopy(shipment_payload)
            payload[attr] = value
            errors = schemas().validate(payload)
            assert errors != {}


def test_shipment_schemas_validate_returns_errors_when_contains_unknown_attributes(shipment_payload):
    for schemas in (ShipmentSchema, OptionalShipmentSchema):
        payload = copy.deepcopy(shipment_payload)
        payload['non-existed-attribute'] = None
        errors = schemas().validate(payload)
        assert errors != {}


def test_shipment_schemas_validate_returns_errors_when_title_is_invalid(shipment_payload):
    payload = copy.deepcopy(shipment_payload)
    for schemas in (ShipmentSchema, OptionalShipmentSchema):
        for value in (1, '*' * 251):
            payload['title'] = value
            errors = schemas().validate(payload)
            assert errors != {}


def test_shipment_schemas_validate_returns_errors_when_weight_is_invalid(shipment_payload):
    payload = copy.deepcopy(shipment_payload)
    for schemas in (ShipmentSchema, OptionalShipmentSchema):
        for value in ('foo', -1,):
            payload['weight'] = value
            errors = schemas().validate(payload)
            assert errors != {}
