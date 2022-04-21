import React from 'react'
import { useState } from 'react';
import { Form, Button, Row } from 'react-bootstrap'

const AddProfile = ({onSubmit}) => {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {        
        e.preventDefault();
        var profile = {name: name, plants: []}
        onSubmit(profile);
    }
    return (
        <Form onSubmit={handleSubmit} className='mx-2'>
            <Row className='mb-2'>
                <Form.Group controlId='formPlantName'>
                    <Form.Label>Profile name</Form.Label>
                    <Form.Control type='text' placeholder='Profile name' onChange={(e) => setName(e.target.value)} />
                </Form.Group>
            </Row>
            <Row>
                <Button variant='primary' type='submit'>Add profile</Button>
            </Row>
        </Form>
    )
}

export default AddProfile