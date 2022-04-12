import { ActionType } from '../actions'


const shipments = (state = null, action) => {
  switch (action.type) {
    case ActionType.LOAD_SHIPMENTS:
      return action.shipments
    case ActionType.ADD_SHIPMENT:
      return [...state, action.shipment]
    case ActionType.EDIT_SHIPMENT:
      return state.map((sh) => (sh.id !== action.data.id ? sh : action.data))
    case ActionType.REMOVE_SHIPMENT:
      return state.filter(shipment => (shipment.id !== action.id))
    default:
      return state
  }
}

export default shipments
