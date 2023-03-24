import React from 'react'
import { Row, Container, Col, Image, Button } from 'react-bootstrap'
import library from '../../assets/img/library.jpg'
import './home.css'
import { useNavigate } from 'react-router-dom'

export const Home = () => {

  const navigate = useNavigate()

  return (
    <Container className='minHeight mb-5'>
      <Row className='mt-5'>

        <Col sm={6}>
          <div className='textDiv'>
            <div className='wellcome'>Wellcome to my Book Collection</div>
            <div className='homeSecPar sourceSerifPro'>Check my books about Web Development</div>
            <div className='divHomeEnter'>
              <Button 
              variant='info' 
              className='enterButton workSans'
              onClick={() => navigate('/allbooks')}
              >Enter
              </Button>
            </div>
          </div>
          
        </Col>
        <Col sm={6}>
          <Image className='imgHome' src={ library } />
        </Col>

      </Row>
    </Container>
  )
}
