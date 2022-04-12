import React from "react";
import { Spinner } from "reactstrap";


const CenteredLoader = (props) => (
  <div className="text-center">
    <Spinner {...props} />
  </div>
)

export default CenteredLoader
