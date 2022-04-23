import React from 'react'
import { Form, Row, Button } from 'react-bootstrap'
import FormTimeInput from './FormTimeInput'
import { useState } from 'react'

const AddPlant = ({onSubmit}) => {
    const [name, setName] = useState('');
    const [stageTimes, setStageTimes] = useState(
        [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]
    )
    const updatePlant = (stageNum, timeIndex, newNum) => {
        var times = {...stageTimes};
        if(newNum){
            times[stageNum][timeIndex] = parseInt(newNum);
        } else{
            times[stageNum][timeIndex] = 0;
        }
        setStageTimes(times);
    }
    
    const submitPlant = (e) => {
        e.preventDefault();
        var plant = {
            name: name,
            stageTimes: stageTimes
        }
        onSubmit(plant);
    }

    return (
        <Form onSubmit={submitPlant} className='mx-2'>
            <Row className='mb-2'>
                <Form.Group>
                    <Form.Label>Plant name</Form.Label>
                    <Form.Control type='text' placeholder='Plant name' required onChange={(e) => setName(e.target.value)} />
                </Form.Group>
            </Row>
            <Row className='mb-1'>
                <FormTimeInput stageNum={0} onChange={updatePlant} />
                <FormTimeInput stageNum={1} onChange={updatePlant} />
                <FormTimeInput stageNum={2} onChange={updatePlant} />
            </Row>
            <Row>
                <Button variant='primary' type='submit'>Add plant</Button>
            </Row>
        </Form>
    )
}

export default AddPlant