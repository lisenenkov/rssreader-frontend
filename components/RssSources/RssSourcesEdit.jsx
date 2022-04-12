import { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { createConfirmation, confirmable } from 'react-confirm'
import { CheckLg, XLg } from "react-bootstrap-icons"

const RssSourcesEdit = ({ rssSource, onSave, show, proceed }) => {
  const [rssSourceName, setRssSourceName] = useState(rssSource.name || "")
  const [rssSourceURL, setRssSourceURL] = useState(rssSource.url || "")
  const handleSubmit = async () => {
    if (await onSave({ name: rssSourceName, url: rssSourceURL })) {
      proceed(true)
    }
  }

  const handleClose = () => proceed(false)

  return <>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>RSS source</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" required value={rssSourceName} onChange={({ target: { value } }) => setRssSourceName(value)} />
          </Form.Group>
          <Form.Group controlId="url">
            <Form.Label>URL</Form.Label>
            <Form.Control type="url" required value={rssSourceURL} onChange={({ target: { value } }) => setRssSourceURL(value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="me-4" variant="primary" onClick={handleSubmit}><CheckLg /> Save</Button>
        <Button variant="secondary" onClick={handleClose}><XLg /> Close</Button>
      </Modal.Footer>
    </Modal>
  </>
}

export default createConfirmation(confirmable(RssSourcesEdit))
