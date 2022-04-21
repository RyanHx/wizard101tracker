import React from 'react'
import AddProfile from './AddProfile'
import { Modal } from 'react-bootstrap'

const AddProfileModal = ({show, handleModalSubmit, setModalShow}) => {
    return (
        <Modal
            show={show}
            onHide={() => setModalShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Profile
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddProfile onSubmit={handleModalSubmit} />
            </Modal.Body>
        </Modal>
    )
}

export default AddProfileModal