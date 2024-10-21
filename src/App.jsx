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
import PlantFormTimeInput from './components/PlantFormTimeInput';
import { Duration } from 'luxon';
import { PlantsContext } from './components/PlantsContext';

function App() {
  // State
  const [profiles, setProfiles] = useState((JSON.parse(localStorage.getItem('profiles')) || []));
  const [plants, setPlants] = useState((JSON.parse(localStorage.getItem('plants')) || []));
  // Add profile modal visible state
  const [showAddProfileModal, setShowAddProfileModal] = useState(false);
  const handleCloseAddProfileModal = () => setShowAddProfileModal(false);
  const handleShowAddProfileModal = () => setShowAddProfileModal(true);
  // Add plant modal visible state
  const [showAddPlantModal, setShowAddPlantModal] = useState(false);
  const handleCloseAddPlantModal = () => setShowAddPlantModal(false);
  const handleShowAddPlantModal = () => setShowAddPlantModal(true);

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
                  <Modal.Title>Create profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={(e) => {
                    e.preventDefault();
                    const newProfiles = [...profiles, { name: e.target.formProfileName.value, plants: [], id: crypto.randomUUID() }];
                    localStorage.setItem('profiles', JSON.stringify(newProfiles));
                    setProfiles(newProfiles);
                    handleCloseAddProfileModal();
                  }}>
                    <Form.Group controlId='formProfileName' className='mb-2'>
                      <Form.Label>Profile name</Form.Label>
                      <Form.Control type='text' placeholder='Profile name' required />
                    </Form.Group>
                    <Form.Group>
                      <Button variant='primary' type='submit' className='w-100'>Add profile</Button>
                    </Form.Group>
                  </Form>
                </Modal.Body>
              </Modal>
            </Col>
          </Row>
          <Row><p className='text-muted'>You can define multiple profiles (accounts) here.</p></Row>
          <Row>
            <Accordion alwaysOpen>
              {profiles.map(profile => (
                <PlantsContext.Provider key={profile.id} value={plants}>
                  <ProfileAccordionItem profiles={profiles} profile={profile} setProfiles={setProfiles} />
                </PlantsContext.Provider>
              ))}
            </Accordion>
          </Row>
        </Col>
        <Col sm={12} md={6}>
          <Row className='align-items-center'>
            <Col><h2>Plants</h2></Col>
            <Col className='text-end'><Button variant='success' onClick={handleShowAddPlantModal}>Create plant</Button></Col>
            <Modal show={showAddPlantModal} onHide={handleCloseAddPlantModal} size='lg' centered>
              <Modal.Header closeButton>
                <Modal.Title>Create plant</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={(e) => {
                  e.preventDefault();
                  const newPlants = [
                    ...plants,
                    {
                      id: crypto.randomUUID(),
                      name: e.target.formPlantName.value,
                      stageTimes: [
                        Duration.fromObject({ hours: e.target.s2y_h.value || 0, minutes: e.target.s2y_m.value || 0, seconds: e.target.s2y_s.value || 0 }).toObject(),
                        Duration.fromObject({ hours: e.target.y2m_h.value || 0, minutes: e.target.y2m_m.value || 0, seconds: e.target.y2m_s.value || 0 }).toObject(),
                        Duration.fromObject({ hours: e.target.m2e_h.value || 0, minutes: e.target.m2e_m.value || 0, seconds: e.target.m2e_s.value || 0 }).toObject()
                      ]
                    }
                  ]
                  localStorage.setItem('plants', JSON.stringify(newPlants));
                  setPlants(newPlants);
                  handleCloseAddPlantModal();
                }}>
                  <Form.Group controlId='formPlantName' className='mb-2'>
                    <Form.Label>Plant name</Form.Label>
                    <Form.Control type='text' placeholder='Plant name' required />
                  </Form.Group>
                  <Row className='px-3 mb-2'>
                    <PlantFormTimeInput label={'Seed to young'} controlId={'s2y'} />
                    <PlantFormTimeInput label={'Young to mature'} controlId={'y2m'} />
                    <PlantFormTimeInput label={'Mature to elder'} controlId={'m2e'} />
                  </Row>
                  <Form.Group>
                    <Button variant='primary' type='submit' className='w-100'>Add plant</Button>
                  </Form.Group>
                </Form>
              </Modal.Body>
            </Modal>
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
