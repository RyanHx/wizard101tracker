import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import PlantCard from './components/PlantCard';
import ProfileAccordionItem from './components/ProfileAccordionItem';
import Accordion from 'react-bootstrap/Accordion';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function App() {
  const [profiles, setProfiles] = useState((JSON.parse(localStorage.getItem('profiles')) || []));
  const [plants, setPlants] = useState((JSON.parse(localStorage.getItem('plants')) || []));
  const [showAddProfileModal, setShowAddProfileModal] = useState(false);
  const handleCloseAddProfileModal = () => setShowAddProfileModal(false);
  const handleShowAddProfileModal = () => setShowAddProfileModal(true);

  return (
    <Container>
      <Row>
        <header className="text-center">
          <Row><h1>Wizard101 Plant Tracker</h1></Row>
          <Row><hr /></Row>
        </header>
      </Row>
      <Row className='gy-4'>
        <Col sm={12} md={6}>
          <Row className='align-items-center'>
            <Col><h2>Profiles</h2></Col>
            <Col className='text-end'>
              <Button variant='success' onClick={handleShowAddProfileModal}>Create profile</Button>
              <Modal show={showAddProfileModal} onHide={handleCloseAddProfileModal} centered>
                <Modal.Header closeButton>
                  <Modal.Title>Add profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={(e) => {
                    e.preventDefault();
                    const newProfiles = [...profiles, { name: e.target.formProfileName.value, plants: [], id: crypto.randomUUID() }];
                    localStorage.setItem('profiles', JSON.stringify(newProfiles));
                    setProfiles(newProfiles);
                    handleCloseAddProfileModal();
                  }}>
                    <Row>
                      <Col>
                        <Row className='mb-2'>
                          <Form.Group controlId='formProfileName'>
                            <Form.Label>Profile name</Form.Label>
                            <Form.Control type='text' placeholder='Profile name' required />
                          </Form.Group>
                        </Row>
                        <Row>
                          <Form.Group>
                            <Button variant='primary' type='submit' className='w-100'>Add profile</Button>
                          </Form.Group>
                        </Row>
                      </Col>
                    </Row>
                  </Form>
                </Modal.Body>
              </Modal>
            </Col>
          </Row>
          <Row><p className='text-muted'>You can define multiple profiles (accounts) here.</p></Row>
          <Row>
            <Accordion alwaysOpen>
              {profiles.map(profile => (
                <ProfileAccordionItem key={profile.id} profiles={profiles} profile={profile} setProfiles={setProfiles} />
              ))}
            </Accordion>
          </Row>
        </Col>
        <Col sm={12} md={6}>
          <Row className='align-items-center'>
            <Col><h2>Plants</h2></Col>
            <Col className='text-end'><Button variant='success'>Create plant</Button></Col>
          </Row>
          <Row><p className='text-muted'>Define your plant timers here to add them to a profile.</p></Row>
          <Row className='px-2'>
            {plants.map(plant => (
              <PlantCard key={plant.id} plants={plants} plant={plant} setPlants={setPlants} profiles={profiles} setProfiles={setProfiles} />
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
