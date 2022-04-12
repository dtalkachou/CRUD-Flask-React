import axios from 'axios';

  
const shipmentsAPI = axios.create({
  baseURL: `http://localhost:5000/api/shipments`,
})


export const createShipment = (data) => (
  shipmentsAPI.post('', data)
)

export const getShipments = () => (
  shipmentsAPI.get()
)

export const getShipment = (shipmentId) => (
  shipmentsAPI.get(`/${shipmentId}`)
)

export const updateShipment = (shipmentId, data) => (
  shipmentsAPI.patch(`/${shipmentId}`, data)
)

export const deleteShipment = (shipmentId) => (
  shipmentsAPI.delete(`/${shipmentId}`)
)
