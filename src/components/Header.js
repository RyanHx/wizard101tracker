import React from 'react'
import PropTypes from 'prop-types'
import { Container, Row } from 'react-bootstrap'

const Header = ({ title }) => {
  return (
    <header>
      <Container>
        <Row><h1>{title}</h1></Row>
        <Row><hr /></Row>
      </Container>
    </header>
  )
}

Header.defaultProps = {
  title: 'Wizard101 Plant Tracker',
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Header