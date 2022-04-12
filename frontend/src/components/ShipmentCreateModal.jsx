import React from 'react'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import { addShipment } from '../actions'
import { createShipment } from '../utils/shipmentsAPI'
import ShipmentModalForm from './ShipmentModalForm'


const ShipmentCreateModal = ({ addShipment }) => {
  return (
    <ShipmentModalForm
      buttonOpen={(onClick) => (
        <Button color="primary" onClick={onClick} size="sm">Create</Button>
      )}
      modalHeader="Create shipment"
      onSuccessAction={addShipment}
      process={createShipment}
      submitButtonText="Create" />
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  addShipment: (data) => dispatch(addShipment(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShipmentCreateModal)
