import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Table } from 'reactstrap'
import { editShipment } from '../actions'
import ShipmentRemoveModal from './ShipmentRemoveModal'
import ShipmentEditModal from './ShipmentEditModal'



const mapStateToRowProps = (state) => ({})

const mapDispatchToRowProps = (dispatch) => ({
  editShipment: (data) => dispatch(editShipment(data))
})

const ShipmentTableRow = connect(mapStateToRowProps, mapDispatchToRowProps)(
  ({ shipment, editShipment }) => (
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
          onSuccessAction={editShipment}
        />{' '}
        <ShipmentRemoveModal shipmentId={shipment.id}/>
      </td>
    </tr>
  )
)

const ShipmentsTable = ({ shipments }) => {
  if (!shipments) {
    return null
  } else if (shipments.length) {
    return (
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
    )
  } else {
    return (
      <p className="text-primary text-center">List of shipments is empty</p>
    )
  }
}

const mapStateToProps = (state) => ({
  shipments: state.shipments
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShipmentsTable)
