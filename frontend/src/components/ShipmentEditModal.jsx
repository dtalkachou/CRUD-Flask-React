import React from 'react'
import { Button } from 'reactstrap'
import { updateShipment } from '../utils/shipmentsAPI'
import ShipmentModalForm from './ShipmentModalForm'


const ShipmentEditModal = ({ shipment, onSuccessAction }) => (
  <ShipmentModalForm
    shipment={shipment}
    buttonOpen={(onClick) => (
      <Button color="secondary" outline size="sm" onClick={onClick}>Edit</Button>
    )}
    modalHeader="Edit shipment"
    onSuccessAction={onSuccessAction}
    process={(data) => updateShipment(shipment.id, data)}
    submitButtonText="Save"
  />
)

export default ShipmentEditModal
