import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import PlantList from './components/PlantList';
import ProfileAccordion from './components/ProfileAccordion';

let initialPlants = [
  { id: 0, name: 'Marta Colvin Andrade' },
  { id: 1, name: 'Lamidi Olonade Fakeye' },
  { id: 2, name: 'Louise Nevelson' },
];

let initialProfiles = [
  { id: 0, name: 'Marta', plants: [] },
  { id: 1, name: 'Lamidi', plants: [] },
  { id: 2, name: 'Louise', plants: [] },
];

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
            <ProfileAccordion profiles={profiles} setProfiles={setProfiles} />
          </Row>
        </Col>
        <Col sm={12} md={6}>
          <Row className='align-items-center'>
            <Col><h2>Plants</h2></Col>
            <Col className='text-end'><Button variant='success'>Create plant</Button></Col>
          </Row>
          <Row><p className='text-muted'>Define your plant timers here to add them to a profile.</p></Row>
          <Row>
            <PlantList plants={plants} setPlants={setPlants} profiles={profiles} setProfiles={setProfiles} />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
