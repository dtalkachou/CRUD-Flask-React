export const ActionType = {
  LOAD_SHIPMENTS: 'load_shipments',
  ADD_SHIPMENT: 'add_shipment',
  EDIT_SHIPMENT: 'edit_shipment',
  REMOVE_SHIPMENT: 'remove_shipment',
}

export const loadShipments = (shipments) => ({
  type: ActionType.LOAD_SHIPMENTS,
  shipments: shipments
})

export const addShipment = (shipment) => ({
  type: ActionType.ADD_SHIPMENT,
  shipment: shipment
})

export const editShipment = (data) => ({
  type: ActionType.EDIT_SHIPMENT,
  data: data
})

export const removeShipment = (id) => ({
  type: ActionType.REMOVE_SHIPMENT,
  id: id
})
