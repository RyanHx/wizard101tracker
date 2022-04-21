import React from 'react'
import { DropdownButton, Dropdown } from 'react-bootstrap'

const AddProfilePlantDropDown = ({ profile, plants, onAdd }) => {
    return (
        <DropdownButton id="dropdown-item-button" title="Add plant" autoClose="outside">
            {plants.map(plant => (
                <Dropdown.Item key={plant.id} as="button" onClick={() => onAdd(profile.id, plant.id)}>{plant.name}</Dropdown.Item>
            ))}
        </DropdownButton>
    )
}

export default AddProfilePlantDropDown