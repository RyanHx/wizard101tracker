import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Dropdown from 'react-bootstrap/Dropdown';

export default function ProfileAccordion({ profiles, setProfiles }) {
  return (
    <Accordion id='profileAccordion' alwaysOpen>
      {profiles.map(profile => (
        <Accordion.Item key={profile.id} eventKey={profile.id}>
          <Row className='m-0'>
            <Col className='px-0'>
              <Accordion.Header>
                {profile.name}
              </Accordion.Header>
            </Col>
            <Col xs={'auto'} className='p-0 m-0'>
              <Dropdown className='w-100 h-100 rounded-0 rounded-end-1'>
                <Dropdown.Toggle variant="danger" className='w-100 h-100 rounded-0 rounded-end-1'>
                  Delete
                </Dropdown.Toggle>
                <Dropdown.Menu variant='danger-border-subtle'>
                  <Dropdown.Item as={Button} onClick={() => setProfiles(profiles.filter(p => p.id !== profile.id))}>
                    Confirm
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          <Accordion.Body>plants</Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

ProfileAccordion.propTypes = {
  profiles: PropTypes.array.isRequired,
  setProfiles: PropTypes.func.isRequired
}