import React, { useCallback, useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import useRequestReducer from '../hooks/useRequestReducer'
import { getShipment } from '../utils/shipmentsAPI'
import CenteredLoader from '../components/CenteredLoader'
import ShipmentEditModal from '../components/ShipmentEditModal'


const TermDefinition = ({ term, definition, showEmpty = true }) => (
  (definition || showEmpty) && (
    <>
      <dt className="col-sm-3">{term}</dt>
      <dd className="col-sm-9">{definition}</dd>
    </>
  )
)

const ShipmentDetail = () => {
  const { shipmentId } = useParams()
  const [shipment, setShipment] = useState()
  const getProcess = useCallback(() => (
    getShipment(shipmentId)
  ), [shipmentId])
  const [{ isPending, error }, dispatchRequest] = useRequestReducer(getProcess)

  const onSuccessActionEdit = useCallback((data) => (
    setShipment((prevData) => ({...prevData, ...data}))
  ), [setShipment])

  useEffect(() => {
    dispatchRequest((data) => {
      setShipment(data)
    })
  }, [])

  return (
    <>
      <h1>Shipment</h1>
      <hr/>
      {error && <p className="text-center text-danger">{error.message}</p>}
      {isPending && <CenteredLoader color="primary"/>}
      {shipment && (
        <div className="shipment-description row">
          <TermDefinition term="Title" definition={shipment.title}/>
          <TermDefinition term="Weight" definition={shipment.weight}/>
          <TermDefinition term="Address" showEmpty={false} definition={shipment.address}/>
          <TermDefinition term="Shipper" showEmpty={false} definition={shipment.shipper} />
          <TermDefinition term="Sent at" definition={new Date(shipment.sent_at).toLocaleString()} />
        </div>
      )}
      <hr/>
      {!isPending && !error && (
        <ShipmentEditModal
          shipment={shipment}
          onSuccessAction={onSuccessActionEdit}
        />
      )}{' '}
      <NavLink to={'/'} className="btn btn-secondary btn-sm">Back to shipments</NavLink>
    </>
  )
}

export default ShipmentDetail
