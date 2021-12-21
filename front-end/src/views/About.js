import React from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const About = () => {
    return (
        <Container>
            <Row className='mt-5'>
                <Col className='text-center'>
                    <img src='https://miro.medium.com/max/900/0*UqGyYmWCRQnjLzSk.jpg' alt='about'/>
                    <Button variant='primary' size='lg' href='https://www.youtube.com/channel/UCUjMB5vQyVjmFZDCX4VR31w' className='mt-3'>
                        Learn more cool things on HenryWebDev channel
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}

export default About
