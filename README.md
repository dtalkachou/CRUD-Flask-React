# Flask and React CRUD application

## Instalation

To install the application, you just need to run the following command:
```
$ make init
```

## Usage

By default, the application runs on two ports `:5000` (backend) and `:3000` (frontend). To interact with the application via the UI, go to http://localhost:3000 , to send API requests, use http://localhost:5000.

## API endpoints

| URL | HTTP Method | Action | Request data | Response data | Response status
|---|---|---|---|---|---|
| /api/shipments | GET | Retrieves list of shipments |  | List of [FullShipmentSchema](#FullShipmentSchema) | 200
| /api/shipments | POST | Create new shipment | [PublicShipmentSchema](#PublicShipmentSchema) | [FullShipmentSchema](#FullShipmentSchema) | 201
| /api/shipments/:id | GET | Retrieves shipment by id |  | [FullShipmentSchema](#FullShipmentSchema) | 200
| /api/shipments/:id | PUT | Provides shipment by id fully | [PublicShipmentSchema](#PublicShipmentSchema) | [FullShipmentSchema](#FullShipmentSchema) | 200
| /api/shipments/:id | PATCH | Updates shipment by id partially | [ShipmentUpdateSchema](#ShipmentUpdateSchema) | [FullShipmentSchema](#FullShipmentSchema) | 200
| /api/shipments/:id | DELETE | Deletes shipment by id |  | | 204

### Schemas

#### FullShipmentSchema

| Attribute | Description | Required | Type
|---|---|---|---|
| id | ID | yes | Integer
| title | Shipment title | yes | String(250)
| weight | Shipment weight | yes | Decimal
| address | The address the shipment is to be delivered to | no | String(250)
| shipper | The shipment initiator | no | String(250)
| sent_at | The time the shipment was sent (registered in the system) | yes | DateTime

#### PublicShipmentSchema

The same as [FullShipmentSchema](#FullShipmentSchema) excludes the `id` and `sent_at` attributes.

#### ShipmentUpdateSchema

The same as [PublicShipmentSchema](#PublicShipmentSchema), only all attributes are optional.
