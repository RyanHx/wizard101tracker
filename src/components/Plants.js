import Plant from './Plant'
import React from 'react';
import AddPlantModal from './AddPlantModal';
import { Col, Container, ListGroup, Row, Button } from 'react-bootstrap'

export const Plants = ({ plants, onDelete, onSubmit }) => {
    const [modalShow, setModalShow] = React.useState(false);
    const handleModalSubmit = (plant) => {
        setModalShow(false);
        onSubmit(plant);
    }

    return (
        <>
            <Container >
                <Row className='header-row'>
                    <Col><h2>Plants</h2></Col>
                    <Col className='col-3'><Button variant="primary" onClick={() => setModalShow(true)}>Add Plant</Button></Col>
                </Row>
                <Row className='plantDirectory'>
                    {plants.length === 0 ? <p>No plants added</p> :
                        <ListGroup as="ul">
                            <p className='text-muted'> Times in HH:MM:SS format</p>
                            {plants.map((plant) => (
                                <ListGroup.Item key={plant.id} as="li">
                                    <Plant plant={plant} onDelete={onDelete} />
                                </ListGroup.Item>
                            ))}
                        </ListGroup>}
                </Row>
            </Container>
            <AddPlantModal show={modalShow} setModalShow={setModalShow} handleModalSubmit={handleModalSubmit} />
        </>
    )
}

export default Plants