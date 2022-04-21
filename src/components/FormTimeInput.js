import React from 'react'
import { Form, Col, Row } from 'react-bootstrap'

const FormTimeInput = ({ stageNum, onChange }) => {
    var formStage = 'formStage' + stageNum;
    var label = '';
    switch (stageNum) {
        default:
        case 0:
            label = 'Seed to young time';
            break;
        case 1:
            label = 'Young to mature time';
            break;
        case 2:
            label = 'Mature to elder time';
            break;
    }

    return (
        <Form.Group as={Col} controlId={formStage + 'Time'} className='border p-2'>
            <Row>
                <Form.Label><strong>{label}</strong></Form.Label>
                <Form.Group as={Col} controlId={formStage + 'Hours'}>
                    <Form.Label>Hours</Form.Label>
                    <Form.Control type='number' min={0} onChange={(e) => onChange(stageNum, 0, e.target.value)} />
                </Form.Group>
                <Form.Group as={Col} controlId={formStage + 'Mins'}>
                    <Form.Label>Minutes</Form.Label>
                    <Form.Control type='number' min={0} onChange={(e) => onChange(stageNum, 1, e.target.value)} />
                </Form.Group>
                <Form.Group as={Col} controlId={formStage + 'Secs'}>
                    <Form.Label>Seconds</Form.Label>
                    <Form.Control type='number' min={0} onChange={(e) => onChange(stageNum, 2, e.target.value)} />
                </Form.Group>
            </Row>
        </Form.Group>
    )
}

export default FormTimeInput