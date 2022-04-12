import React, { useEffect, useState } from 'react'
import useRequestReducer from '../hooks/useRequestReducer'
import { getShipments } from '../utils/shipmentsAPI'
import CenteredLoader from '../components/CenteredLoader'
import ShipmentsTable from '../components/ShipmentsTable'
import ShipmentCreateModal from '../components/ShipmentCreateModal'


const ShipmentsList = () => {
  const [shipments, setShipments] = useState()
  const [{ isPending, error }, dispatchRequest] = useRequestReducer(getShipments)

  useEffect(() => {
    dispatchRequest((data) => {
      setShipments(data)
    })
  }, [])

  return (
    <>
      <h1>Shipments</h1>
      {!isPending && !error && <ShipmentCreateModal />}
      <hr/>
      {isPending && <CenteredLoader color="primary" />}
      {shipments && <ShipmentsTable shipments={shipments}/>}
      {error && <p className="text-center text-danger">{error.message}</p>}
    </>
  )
}

export default ShipmentsList
