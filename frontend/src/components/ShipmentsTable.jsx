import React, { useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import { Table } from 'reactstrap'
import ShipmentRemoveModal from './ShipmentRemoveModal'
import ShipmentEditModal from './ShipmentEditModal'


const ShipmentTableRow = ({ shipment }) => {
  const onSuccessAction = useCallback((data) => (
    null
  ), [])

  return (
    <tr>
      <td>
        <NavLink to={`${shipment.id}`}>{shipment.title}</NavLink>
      </td>
      <td>{shipment.weight}</td>
      <td>{shipment.address}</td>
      <td>{shipment.shipper}</td>
      <td>{new Date(shipment.sent_at).toLocaleString()}</td>
      <td>
        <ShipmentEditModal
          shipment={shipment}
          onSuccessAction={onSuccessAction}
        />{' '}
        <ShipmentRemoveModal shipmentId={shipment.id}/>
      </td>
    </tr>
  )
}

const ShipmentsTable = ({ shipments }) => (
  shipments.length ? (
    <div className="overflow-auto">
      <Table bordered striped>
        <thead className="thead-dark">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Weight</th>
            <th scope="col">Address</th>
            <th scope="col">Shipper</th>
            <th scope="col">Sent at</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((sh) => (
            <ShipmentTableRow key={sh.id} shipment={sh}/>
          ))}
        </tbody>
      </Table>
    </div>
  ) : (
    <p className="text-primary text-center">List of shipments is empty</p>
  )
)

export default ShipmentsTable
