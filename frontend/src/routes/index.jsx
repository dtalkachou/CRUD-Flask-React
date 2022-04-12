import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ShipmentsRoutes from "./ShipmentsRoutes";
import NotFound from "../pages/NotFound";


const AppRoutes = () => (
  <Routes>
    <Route index element={<Navigate to="/shipments" />} />
    <Route path="shipments/*" element={<ShipmentsRoutes />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
)

export default AppRoutes
