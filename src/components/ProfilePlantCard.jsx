import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { FiX, FiPlay, FiSkipForward, FiRefreshCw } from "react-icons/fi";
import { DateTime } from 'luxon';
import { useContext } from 'react';
import { PlantsContext } from './PlantsContext';

export default function ProfilePlantCard({ profilePlant, profiles, profile, setProfiles }) {
    const currentPlant = useContext(PlantsContext).filter(p => p.id === profilePlant.plantId)[0];
    return (
        <Card>
            <Card.Body>
                <Card.Title>{profilePlant.plantId}</Card.Title>
                <Row>
                    <Col>
                        <Row>
                            <Card.Text>
                                Stage: {profilePlant.currentStage}
                            </Card.Text>
                        </Row>
                        <Row>
                            <Card.Text>
                                {DateTime.now() > profilePlant.finishDate ? 'Completed' : 'Time left: ' + DateTime.now().diff(profilePlant.finishDate, ['hours', 'minutes', 'seconds']).toHuman()}
                            </Card.Text>
                        </Row>
                    </Col>
                    <Col className='align-self-center text-lg-end text-md-start'>
                        <ButtonGroup>
                            <Button variant='success' onClick={() => {
                                if (profilePlant.finishDate > DateTime.now()) return;
                                const newProfiles = profiles.map(p => {
                                    if (p.id !== profile.id) return p;
                                    const newStage = Math.min(2, profilePlant.currentStage + 1);
                                    return {
                                        ...p,
                                        plants: p.plants.map(pp => {
                                            if (pp.id !== profilePlant.id) return pp;
                                            return {
                                                ...pp,
                                                currentStage: newStage,
                                                finishDate: DateTime.now().plus(currentPlant.stageTimes[newStage])
                                            }
                                        })
                                    }
                                });
                                setProfiles(newProfiles);
                                localStorage.setItem('profiles', JSON.stringify(newProfiles));
                            }}><FiPlay /></Button>
                            <Button variant='secondary' onClick={() => {
                                if (profilePlant.currentStage === 2) return;
                                const newProfiles = profiles.map(p => {
                                    if (p.id !== profile.id) return p;
                                    return {
                                        ...p,
                                        plants: p.plants.map(pp => {
                                            if (pp.id !== profilePlant.id) return pp;
                                            return {
                                                ...pp,
                                                currentStage: profilePlant.currentStage + 1,
                                                finishDate: DateTime.now().plus(currentPlant.stageTimes[profilePlant.currentStage + 1])
                                            }
                                        })
                                    }
                                });
                                setProfiles(newProfiles);
                                localStorage.setItem('profiles', JSON.stringify(newProfiles));
                            }}><FiSkipForward /></Button>
                            <Button variant='warning' onClick={() => {
                                const newProfiles = profiles.map(p => {
                                    if (p.id !== profile.id) return p;
                                    return {
                                        ...p,
                                        plants: p.plants.map(pp => {
                                            if (pp.id !== profilePlant.id) return pp;
                                            return {
                                                ...pp,
                                                currentStage: 0,
                                                finishDate: DateTime.now().plus(currentPlant.stageTimes[0])
                                            }
                                        })
                                    }
                                });
                                setProfiles(newProfiles);
                                localStorage.setItem('profiles', JSON.stringify(newProfiles));
                            }}><FiRefreshCw /></Button>
                            <Button variant='danger' onClick={() => {
                                const newProfiles = profiles.map(p => {
                                    if (p.id !== profile.id) return p;
                                    return {
                                        ...p,
                                        plants: p.plants.filter(pp => pp.id !== profilePlant.id)
                                    }
                                });
                                setProfiles(newProfiles)
                                localStorage.setItem('profiles', JSON.stringify(newProfiles));
                            }}><FiX /></Button>
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