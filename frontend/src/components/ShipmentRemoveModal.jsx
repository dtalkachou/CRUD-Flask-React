import React, { useCallback, useState } from 'react'
import { connect } from 'react-redux'
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap'
import { removeShipment } from '../actions'
import { deleteShipment } from '../utils/shipmentsAPI'
import useRequestReducer from '../hooks/useRequestReducer'


const ShipmentRemoveModal = ({ shipmentId, removeShipment }) => {
  const [{ isPending, error }, dispatchRequest] = useRequestReducer(() => deleteShipment(shipmentId))
  const [isOpen, setIsOpen] = useState(false)

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const handleRemove = useCallback(() => {
    dispatchRequest(() => {
      onClose()
      removeShipment(shipmentId)
    })
  }, [dispatchRequest, removeShipment, shipmentId, onClose])

  return (
    <>
      <Button outline color="danger" size="sm" onClick={() => setIsOpen(true)}>Delete</Button>
      <Modal isOpen={isOpen} toggle={onClose}>
        <ModalHeader toggle={onClose}>Remove shipment #{shipmentId}</ModalHeader>
        <ModalBody>
          {error && <Alert color="danger">{error.message}</Alert>}
          Are you sure you want to delete shipment?
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={onClose}>Cancel</Button>
          <Button disabled={isPending} color="danger" onClick={handleRemove}>
            {isPending && <Spinner size="sm"/>} Remove
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  removeShipment: (id) => dispatch(removeShipment(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShipmentRemoveModal)
