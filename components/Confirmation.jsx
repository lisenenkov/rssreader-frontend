import { createConfirmation, confirmable } from 'react-confirm'
import { Button, Modal } from "react-bootstrap"
import { CheckLg, XLg } from "react-bootstrap-icons"

const ConfirmationDialog = ({ header, message, show, proceed }) => {
  const handleClose = () => proceed(false)
  const handleConfirm = () => proceed(true)
  return (
    <Modal show={show} onHide={handleClose} size="md">
      <Modal.Header closeButton>{header}</Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button className="me-4" variant="primary" onClick={handleConfirm}><CheckLg /> Confirm</Button>
        <Button variant="secondary" onClick={handleClose}><XLg /> Cancel</Button>
      </Modal.Footer>
    </Modal>)
}

export const confirm = createConfirmation(confirmable(ConfirmationDialog));