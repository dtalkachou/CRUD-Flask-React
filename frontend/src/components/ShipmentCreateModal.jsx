import React, { useCallback } from 'react'
import { Button } from 'reactstrap'
import { createShipment } from '../utils/shipmentsAPI'
import ShipmentModalForm from './ShipmentModalForm'


const ShipmentCreateModal = () => {
  const onSuccessAction = useCallback((data) => (
    null
  ), [])

  return (
    <ShipmentModalForm
      buttonOpen={(onClick) => (
        <Button color="primary" onClick={onClick} size="sm">Create</Button>
      )}
      modalHeader="Create shipment"
      onSuccessAction={onSuccessAction}
      process={createShipment}
      submitButtonText="Create" />
  )
}

export default ShipmentCreateModal
