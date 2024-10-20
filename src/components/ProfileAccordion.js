import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

export default function ProfileAccordion({ profiles, setProfiles }) {
  return (
    <Accordion id='profileAccordion' defaultActiveKey={['0']} alwaysOpen>
      {profiles.map(profile => (
        <Accordion.Item key={profile.id} eventKey={profile.id}>
          <Row className='m-0'>
            <Col className='px-0'>
              <Accordion.Header>
                {profile.name}
              </Accordion.Header>
            </Col>
            <Col xs={'auto'} className='p-0 m-0'>
              <Button className='w-100 h-100 rounded-0 rounded-end-1' onClick={() => setProfiles(profiles.filter(p => p.id !== profile.id))} variant='danger'>Delete</Button>
            </Col>
          </Row>
          <Accordion.Body>plants</Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}