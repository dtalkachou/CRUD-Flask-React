# Flask and React CRUD application

## Instalation

To install the application, you just need to run the following command:

```
$ make init
```

## Usage

By default, the application runs on two ports `:5000` (backend) and `:3000` (frontend). To interact with the application via the UI, go to http://localhost:3000 , to send API requests, use http://localhost:5000.

## Testing

To run the backend test, to run the following command:

```
$ make test-backend
```

**Note:** Make sure your backend container is running.

## API endpoints

| URL | HTTP Method | Action | Request data | Response data | Response status
|---|---|---|---|---|---|
| /api/shipments | GET | Retrieves list of shipments |  | List of [ShipmentSchema](#ShipmentSchema) | 200
| /api/shipments | POST | Create new shipment | [ShipmentSchema](#ShipmentSchema) | [ShipmentSchema](#ShipmentSchema) | 201
| /api/shipments/:id | GET | Retrieves shipment by id |  | [ShipmentSchema](#ShipmentSchema) | 200
| /api/shipments/:id | PUT | Provides shipment by id fully | [ShipmentSchema](#ShipmentSchema) | [ShipmentSchema](#ShipmentSchema) | 200
| /api/shipments/:id | PATCH | Updates shipment by id partially | [OptionalUpdateSchema](#OptionalUpdateSchema) | [ShipmentSchema](#ShipmentSchema) | 200
| /api/shipments/:id | DELETE | Deletes shipment by id |  | | 204

### Schemas

#### ShipmentSchema

| Attribute | Description | Required/Read-Only | Type
|---|---|---|---|
| id | ID | yes | Integer
| title | Shipment title | yes/no | String(250)
| weight | Shipment weight | yes/no | Decimal
| address | The address the shipment is to be delivered to | no | String(250)
| shipper | The shipment initiator | no | String(250)
| sent_at | The time the shipment was sent (registered in the system) | yes | DateTime

#### OptionalUpdateSchema

The same as [ShipmentSchema](#ShipmentSchema), only all attributes are optional.
