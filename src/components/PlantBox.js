import React from 'react'
import { Container, ListGroup, Row, Col, Button } from 'react-bootstrap';
import { FiX, FiPlay, FiSkipForward, FiRefreshCw } from "react-icons/fi";
import Countdown from 'react-countdown';

const PlantBox = ({ profile, plantData, onDelete, plantContinue, restartPlant }) => {
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <p className='text-success'>Completed</p>;
        } else {
            // Render a countdown
            return <p>Time left: {hours < 10 ? '0' + hours : hours}:{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}</p>;
        }
    };

    return (
        (profile.plants.length > 0 && plantData.plants.length > 0) ?
            <ListGroup as="ul">
                {profile.plants.map((plant) => {
                    var basePlant = plantData.plants.filter(basePlant => basePlant.id === plant.plantId)[0];
                    return (
                        <ListGroup.Item as="li" key={plant.id}>
                            <Container>
                                <Row>
                                    <Col className='col-6'>
                                        <h3>{basePlant.name}</h3>
                                        <p>Stage: {plantData.stageNames[plant.currentStage]}</p>
                                        <Countdown key={plant.finishDate} date={plant.finishDate} renderer={renderer} />
                                    </Col>
                                    <Col className='align-self-center'>
                                        <Button variant='success' onClick={() => plantContinue(profile.id, plant.id, false)}><FiPlay /></Button>{' '}
                                        <Button variant='secondary' onClick={() => plantContinue(profile.id, plant.id, true)}><FiSkipForward /></Button>{' '}
                                        <Button variant='warning' onClick={() => restartPlant(profile.id, plant.id)}><FiRefreshCw /></Button>{' '}
                                        <Button variant='danger' onClick={() => onDelete(profile.id, plant.id)}><FiX /></Button>
                                    </Col>
                                </Row>
                            </Container>
                        </ListGroup.Item>
                    );
                })}
            </ListGroup> : null
    )
}

export default PlantBox