import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import PropTypes from 'prop-types';
import { DateTime } from 'luxon';

function handleLeadingZeroes(times) {
    var timeStrings = times.map(time => (time < 10 ? '0' + time : '' + time));
    return timeStrings.join(':');
}

export default function PlantCard({ plants, plant, setPlants, profiles, setProfiles }) {
    return (
        <Card key={plant.id}>
            <Card.Body>
                <Card.Title>
                    <Row className='align-items-center gy-2'>
                        <Col sm>
                            {plant.name}
                        </Col>
                        <Col className='text-lg-end text-md-start'>
                            <ButtonGroup>
                                <DropdownButton as={ButtonGroup} title="Add to profile" disabled={profiles.length ? false : true} >
                                    {profiles.map(profile => (
                                        <Dropdown.Item
                                            key={profile.id}
                                            onClick={() => {
                                                const newProfiles = profiles.map(p => {
                                                    if (profile.id === p.id) {
                                                        return {
                                                            ...p,
                                                            plants: [
                                                                ...p.plants,
                                                                {
                                                                    id: crypto.randomUUID(),
                                                                    plantId: plant.id,
                                                                    currentStage: 0,
                                                                    finishDate: DateTime.now().plus(plant.stageTimes[0])
                                                                }]
                                                        }
                                                    }
                                                    return p;
                                                });
                                                localStorage.setItem('profiles', JSON.stringify(newProfiles));
                                                setProfiles(newProfiles);
                                            }}>
                                            {profile.name}
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>
                                <DropdownButton as={ButtonGroup} variant="danger" title="Delete">
                                    <Dropdown.Item as={Button} onClick={() => {
                                        const filteredPlants = plants.filter(p => p.id !== plant.id);
                                        localStorage.setItem('plants', JSON.stringify(filteredPlants));
                                        setPlants(filteredPlants);
                                    }}>
                                        Confirm
                                    </Dropdown.Item>
                                </DropdownButton>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Card.Title>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Seed to Young</th>
                            <th>Young to Mature</th>
                            <th>Mature to Elder</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{handleLeadingZeroes(plant.stageTimes[0])}</td>
                            <td>{handleLeadingZeroes(plant.stageTimes[1])}</td>
                            <td>{handleLeadingZeroes(plant.stageTimes[2])}</td>
                        </tr>
                    </tbody>
                </Table>
                <Card.Text><small className='small text-body-secondary pb-0 mb-0'>Times in HH:MM:SS format</small></Card.Text>
            </Card.Body>
        </Card>
    );
}

PlantCard.propTypes = {
    plants: PropTypes.array.isRequired,
    plant: PropTypes.object.isRequired,
    setPlants: PropTypes.func.isRequired,
    profiles: PropTypes.array.isRequired,
    setProfiles: PropTypes.func.isRequired
}