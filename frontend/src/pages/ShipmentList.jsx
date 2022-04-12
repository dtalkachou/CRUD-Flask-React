import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { loadShipments } from '../actions'
import useRequestReducer from '../hooks/useRequestReducer'
import { getShipments } from '../utils/shipmentsAPI'
import CenteredLoader from '../components/CenteredLoader'
import ShipmentsTable from '../components/ShipmentsTable'
import ShipmentCreateModal from '../components/ShipmentCreateModal'


const ShipmentsList = ({ loadShipments }) => {
  const [{ isPending, error }, dispatchRequest] = useRequestReducer(getShipments)

  useEffect(() => {
    dispatchRequest((data) => {
      loadShipments(data)
    })
  }, [])

  return (
    <>
      <h1>Shipments</h1>
      {!isPending && !error && <ShipmentCreateModal />}
      <hr/>
      {isPending && <CenteredLoader color="primary" />}
      <ShipmentsTable />
      {error && <p className="text-center text-danger">{error.message}</p>}
    </>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  loadShipments: (data) => dispatch(loadShipments(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShipmentsList)
