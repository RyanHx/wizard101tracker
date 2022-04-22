import React from 'react'
import { Accordion, Button, Col, Container, Row } from 'react-bootstrap'
import AddProfileModal from './AddProfileModal'
import ProfileAccordianItem from './ProfileAccordianItem'

export const Profiles = ({ profiles, plants, events }) => {
    const [modalShow, setModalShow] = React.useState(false);
    const handleModalSubmit = (profile) => {
        setModalShow(false);
        events.onAddProfile(profile);
    }

    var accordionItemEvents = {
        onAddProfilePlant: events.onAddProfilePlant,
        onDeleteProfile: events.onDeleteProfile,
        onDeletePlant: events.onDeletePlant,
        onPlantContinue: events.onPlantContinue,
        onRestartPlant: events.onRestartPlant
    }

    return (
        <>
            <Container>
                <Row className='header-row'>
                    <Col><h2>Profiles</h2></Col>
                    <Col className='col-3'><Button variant="primary" onClick={() => setModalShow(true)}>Add Profile</Button></Col>
                </Row>
                {profiles.length > 0 ?
                    <Row className='profiles'>
                        <Accordion defaultActiveKey={profiles[0].id} className="profileAccordion">
                            {profiles.map((profile) => (
                                <ProfileAccordianItem
                                    key={profile.id}
                                    profile={profile}
                                    plants={plants}
                                    events={accordionItemEvents}
                                />
                            ))}
                        </Accordion>
                    </Row>
                    : <p>No profiles added</p>}
            </Container>
            <AddProfileModal show={modalShow} setModalShow={setModalShow} handleModalSubmit={handleModalSubmit} />
        </>
    )
}

export default Profiles