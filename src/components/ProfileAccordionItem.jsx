import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Dropdown from 'react-bootstrap/Dropdown';
import ProfilePlantCard from './ProfilePlantCard';

export default function ProfileAccordionItem({ profiles, profile, setProfiles }) {
  return (
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
              <Dropdown.Item as={Button} onClick={() => {
                const filteredProfiles = profiles.filter(p => p.id !== profile.id);
                setProfiles(filteredProfiles);
                localStorage.setItem('profiles', JSON.stringify(filteredProfiles));
              }}>
                Confirm
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <Accordion.Body>
        {profile.plants.length === 0 ?
          <p className='h4 text-center text-muted'>No plants added</p> :
          profile.plants.map(profilePlant =>
            <ProfilePlantCard key={profilePlant.id} profilePlant={profilePlant} profile={profile} profiles={profiles} setProfiles={setProfiles} />
          )}
      </Accordion.Body>
    </Accordion.Item>
  );
}

ProfileAccordionItem.propTypes = {
  profiles: PropTypes.array.isRequired,
  profile: PropTypes.object.isRequired,
  setProfiles: PropTypes.func.isRequired
}