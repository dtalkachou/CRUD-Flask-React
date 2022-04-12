import React, { useCallback, useState } from 'react';
import {
  Button,
  Modal,
  Form,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Spinner,
  FormGroup,
  Label,
  Input,
  FormFeedback
} from 'reactstrap'
import useRequestReducer from '../hooks/useRequestReducer'


const ShipmentModalFormFragment = ({ shipment, error, data, onInputChange }) => {
  const getValidationErrors = useCallback((name) => (
    error && error && error[name] && error[name].map((msg, i) => (
      <FormFeedback key={i}>{msg}</FormFeedback>
    ))
  ), [error])

  const getDefaultValue = useCallback((name, defaultValue = null) => (
    data[name] || (shipment && shipment[name]) || defaultValue
  ), [shipment])

  return (
    <>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input
          type="text"
          required
          id="title"
          name="title"
          maxLength="250"
          invalid={error && error.hasOwnProperty('title')}
          defaultValue={getDefaultValue('title')}
          onChange={onInputChange}
        />
        {getValidationErrors('title')}
      </FormGroup>
      <FormGroup>
        <Label for="weight">Weight</Label>
        <Input
          type="number"
          required
          id="weight"
          name="weight"
          min="0"
          step="0.01"
          invalid={error && error.hasOwnProperty('weight')}
          defaultValue={getDefaultValue('weight')}
          onChange={onInputChange}
        />
        {getValidationErrors('weight')}
      </FormGroup>
      <FormGroup>
        <Label for="address">Address</Label>
        <Input
          type="text"
          id="address"
          name="address"
          maxLength="250"
          invalid={error && error.hasOwnProperty('address')}
          defaultValue={getDefaultValue('address')}
          onChange={onInputChange}
        />
        {getValidationErrors('address')}
      </FormGroup>
      <FormGroup>
        <Label for="shipper">Shipper</Label>
        <Input
          type="text"
          id="shipper"
          name="shipper"
          maxLength="250"
          invalid={error && error.hasOwnProperty('shipper')}
          defaultValue={getDefaultValue('shipper')}
          onChange={onInputChange}
        />
        {getValidationErrors('shipper')}
      </FormGroup>
    </>
  )
}


const ShipmentModalForm = ({ shipment, process, submitButtonText, modalHeader, onSuccessAction, buttonOpen }) => {
  const [data, setData] = useState({})
  const [isOpen, setIsOpen] = useState(false)
  const [{ isPending, error }, dispatchRequest] = useRequestReducer(() => process(data))

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const onSubmit = useCallback((e) => {
    e.preventDefault()
    if (!Object.keys(data).length) {
      onClose()
    } else {
      dispatchRequest((data) => {
        setData({})
        onClose()
        onSuccessAction(data)
      })
    }
  }, [dispatchRequest, setData, setIsOpen, onSuccessAction])

  const handleInputChange = useCallback((e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value || null
    }))
  }, [setData])

  return (
    <>
      {buttonOpen(() => setIsOpen(true))}
      <Modal isOpen={isOpen}>
        <ModalHeader toggle={onClose}>{modalHeader}</ModalHeader>
        <Form onSubmit={onSubmit}>
          <ModalBody>
            <ShipmentModalFormFragment
              data={data}
              shipment={shipment}
              error={error && error.message}
              onInputChange={handleInputChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button disabled={isPending} color="primary">
              {isPending && <Spinner size="sm"/>} {submitButtonText}
            </Button>
            <Button color="secondary" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  )
}

export default ShipmentModalForm
