import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

export default function PlantList({ plants, setPlants, profiles, setProfiles }) {
    return (
        plants.map(plant => (
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
                                            <Dropdown.Item key={profile.id} onClick={() =>
                                                setProfiles(
                                                    profiles.map(p => {
                                                        if (profile.id === p.id) {
                                                            return {
                                                                ...p,
                                                                plants: [...p.plants, plant]
                                                            }
                                                        }
                                                        return p;
                                                    }))
                                            }>{profile.name}</Dropdown.Item>
                                        ))}
                                    </DropdownButton>
                                    <Button variant="danger" onClick={() =>
                                        setPlants(
                                            plants.filter(p => p.id !== plant.id)
                                        )
                                    }>Delete</Button>
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
                                    <td>1</td>
                                    <td>2</td>
                                    <td>3</td>
                                </tr>
                            </tbody>
                        </Table>                    
                    <Card.Text><small className='small text-body-secondary pb-0 mb-0'>Times in HH:MM:SS format</small></Card.Text>
                </Card.Body>
            </Card>
        ))
    );
}