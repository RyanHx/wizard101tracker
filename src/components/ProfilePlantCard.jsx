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
import Countdown from 'react-countdown';
import { zeroPad } from 'react-countdown';

export default function ProfilePlantCard({ profilePlant, profiles, profile, setProfiles }) {
    const currentPlant = useContext(PlantsContext).filter(p => p.id === profilePlant.plantId)[0];
    const stageName = ['Seed', 'Young', 'Mature']
    const renderer = ({ formatted: { hours, minutes, seconds }, completed }) => {
        if (completed) {
            // Render a completed state
            return <p className='text-success'>{profilePlant.currentStage < 2 ? 'Ready to continue' : 'Completed'}</p>;
        } else {
            // Render a countdown
            return <p>Time left: {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}</p>;
        }
    };
    return (
        <Card>
            <Card.Body>
                <Card.Title>{currentPlant.name}</Card.Title>
                <Row>
                    <Col>
                        <Row>
                            <Card.Text>
                                Current stage: {stageName[profilePlant.currentStage]}
                            </Card.Text>
                        </Row>
                        <Row>
                            <Card.Text>
                                <Countdown key={profilePlant.finishDate} date={DateTime.fromISO(profilePlant.finishDate).toJSDate()} renderer={renderer} />                                
                            </Card.Text>
                        </Row>
                    </Col>
                    <Col className='align-self-center text-lg-end text-md-start'>
                        <ButtonGroup>
                            <Button variant='success' onClick={() => {
                                if (DateTime.fromISO(profilePlant.finishDate) > DateTime.now() || profilePlant.currentStage === 2) return;
                                const newProfiles = profiles.map(p => {
                                    if (p.id !== profile.id) return p;
                                    const newStage = profilePlant.currentStage + 1;
                                    return {
                                        ...p,
                                        plants: p.plants.map(pp => {
                                            if (pp.id !== profilePlant.id) return pp;
                                            return {
                                                ...pp,
                                                currentStage: newStage,
                                                finishDate: DateTime.now().plus(currentPlant.stageTimes[newStage]).toISO()
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
                                                finishDate: DateTime.now().plus(currentPlant.stageTimes[profilePlant.currentStage + 1]).toISO()
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
                                                finishDate: DateTime.now().plus(currentPlant.stageTimes[0]).toISO()
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