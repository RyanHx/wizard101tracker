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
  const [profiles, setProfiles] = useState(initialProfiles);
  const [plants, setPlants] = useState(initialPlants);

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
              <Button variant='success'>Create profile</Button>
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
