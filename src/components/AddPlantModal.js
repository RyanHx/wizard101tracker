import React from 'react'
import AddPlant from './AddPlant'
import { Modal } from 'react-bootstrap'

const AddPlantModal = ({show, handleModalSubmit, setModalShow}) => {
    return (
        <Modal
            show={show}
            onHide={() => setModalShow(false)}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Plant
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddPlant onSubmit={handleModalSubmit} />
            </Modal.Body>
        </Modal>
    )
}

export default AddPlantModal