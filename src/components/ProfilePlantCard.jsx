import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { FiX, FiPlay, FiSkipForward, FiRefreshCw } from "react-icons/fi";
import { DateTime } from 'luxon';

export default function ProfilePlantCard({ profilePlant, profiles, profile, setProfiles }) {
    return (
        <Card>
            <Card.Body>
                <Card.Title>{profilePlant.plantId}</Card.Title>
                <Row>
                    <Col>
                        <Row>
                            <Card.Text>
                                Stage:
                            </Card.Text>
                        </Row>
                        <Row>
                            <Card.Text>
                                {DateTime.now() > profilePlant.finishDate ? 'Completed' : 'Time left: ' + DateTime.now().diff(profilePlant.finishDate,['hours','minutes','seconds']).toHuman()}                                
                            </Card.Text>
                        </Row>
                    </Col>
                    <Col className='align-self-center text-lg-end text-md-start'>
                        <ButtonGroup>
                            <Button variant='success' onClick={() => []}><FiPlay /></Button>
                            <Button variant='secondary' onClick={() => []}><FiSkipForward /></Button>
                            <Button variant='warning' onClick={() => []}><FiRefreshCw /></Button>
                            <Button variant='danger' onClick={() => setProfiles(profiles.map(p => {
                                if (p.id !== profile.id) return p;
                                return {
                                    ...p,
                                    plants: p.plants.filter(pp => pp.id !== profilePlant.id)
                                }
                            }))}><FiX /></Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

ProfilePlantCard.propTypes = {
    profilePlant: PropTypes.object.isRequired,
    profiles: PropTypes.array.isRequired,
    profile: PropTypes.object.isRequired,
    setProfiles: PropTypes.func.isRequired
}