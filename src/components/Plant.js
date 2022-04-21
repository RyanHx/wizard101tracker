import React from 'react'
import { Button, Table, Container, Row, Col } from 'react-bootstrap';
import { FiX } from "react-icons/fi";

export const Plant = ({ plant, onDelete }) => {
    function handleLeadingZeroes(times) {
        var timeStrings = times.map(time => (time < 10 ? '0' + time : '' + time));
        return timeStrings.join(':');
    }
    return (
        <Container>
            <Row>
                <Col>
                    <h3>{plant.name}</h3>
                </Col>
                <Col className='col-3'>
                    <Button variant='danger' onClick={() => onDelete(plant.id)}><FiX /></Button>
                </Col>
            </Row>
            <Row>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Seed to Young</th>
                            <th>Young to Mature</th>
                            <th>Mature to Elder</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{handleLeadingZeroes(plant.stageTimes[0])}</td>
                            <td>{handleLeadingZeroes(plant.stageTimes[1])}</td>
                            <td>{handleLeadingZeroes(plant.stageTimes[2])}</td>
                        </tr>
                    </tbody>
                </Table>
            </Row>
        </Container>
    )
}

export default Plant

