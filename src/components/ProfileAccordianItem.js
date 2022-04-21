import React from 'react'
import PlantBox from './PlantBox'
import AddProfilePlantDropDown from './AddProfilePlantDropDown'
import { Accordion, Row, Col, Button, Container } from 'react-bootstrap'

const ProfileAccordianItem = ({ profile, plants, events }) => {
    const plantData = {
        plants: plants,
        stageNames: [
            'Seed',
            'Young',
            'Mature',
            'Elder'
        ]
    }
    return (
        <Accordion.Item eventKey={profile.id} className='profile'>
            <Accordion.Header>
                <h4>{profile.name}</h4>
            </Accordion.Header>
            <Accordion.Body>
                <Container>
                    <Row className='mb-2'>
                        <Col>
                            <AddProfilePlantDropDown profile={profile} plants={plants} onAdd={events.onAddProfilePlant} />
                        </Col>
                        <Col className='col-4'>
                            <Button variant='danger' onClick={() => events.onDeleteProfile(profile.id)}>Delete Profile</Button>
                        </Col>
                    </Row>
                    <Row className='profilePlants'>
                        <PlantBox profile={profile} plantData={plantData} onDelete={events.onDeletePlant} plantContinue={events.onPlantContinue} restartPlant={events.onRestartPlant} />
                    </Row>
                </Container>
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default ProfileAccordianItem