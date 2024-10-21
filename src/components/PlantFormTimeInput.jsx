import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

export default function PlantFormTimeInput({ label, controlId }) {
    return (
        <Col xs={4} className='border'>
            <Form.Label><strong>{label}</strong></Form.Label>
            <Row className='mb-2'>
                <Col>
                    <Form.Group controlId={controlId + '_h'}>
                        <Form.Label>Hours</Form.Label>
                        <Form.Control type='number' min={0} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={controlId + '_m'}>
                        <Form.Label>Minutes</Form.Label>
                        <Form.Control type='number' min={0} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={controlId + '_s'}>
                        <Form.Label>Seconds</Form.Label>
                        <Form.Control type='number' min={0} />
                    </Form.Group>
                </Col>
            </Row>
        </Col>
    );
}

PlantFormTimeInput.propTypes = {
    label: PropTypes.string.isRequired,
    controlId: PropTypes.string.isRequired
}