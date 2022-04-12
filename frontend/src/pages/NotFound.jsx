import React from "react";
import { NavLink } from "react-router-dom";


const NotFound = () => (
  <div className="row">
    <div className="col-md-12">
      <div className="text-center">
        <h1>404</h1>
        <h2>Page not found</h2>
        The page you are looking for does not exist.
        <div className="mt-1">
          <NavLink to="/" className="my-1 btn btn-primary">Home</NavLink>
        </div>
      </div>
    </div>
  </div>
)

export default NotFound
