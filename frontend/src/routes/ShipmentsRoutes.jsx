import React from "react";
import { Routes, Route } from "react-router-dom";
import ShipmentList from "../pages/ShipmentList";
import ShipmentDetail from "../pages/ShipmentDetail";
import NotFound from "../pages/NotFound";


const ShipmentsRoutes = () => {
  return (
    <Routes>
      <Route index element={<ShipmentList />} />
      <Route path=":shipmentId" element={<ShipmentDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default ShipmentsRoutes
