import React, { useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Bin, toCapitalize } from '../../utils/utils'
import './book.css'
import { ModalDeleteBook } from './ModalDeleteBook'


export const DisplayerBooks = ({ allBooks, setAllBooks }) => {

    const [idToDelete, setIdToDelete] = useState(0);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const navigate = useNavigate();

    const handleDelete = (id) => {
        setIdToDelete( id );
        setShowModalDelete(true);
    }

    //console.log(allBooks, 'ALLBOOOOKKSS ')

    return (
    <>
    <Container className='minHeight mb-5'>
        <Row xs={1} sm={2} lg={3} xxl={4} className="g-5">
            {allBooks?.map((book, index) =>{
                return(
                    <Col key={ index }>
                        <Card className='card h-100'>
                            <Card.Img 
                                variant='top' 
                                src={`/images/book/${book.main_image}`}
                            />
                            <Card.Body className='pb-0'>
                                <h5 className='sourceSerifPro'>{ toCapitalize( book.title )}</h5>
                                <h6 className='workSans'>{ toCapitalize( book.category ) }</h6>
                            </Card.Body>                  

                            <Card.Footer className='cardFooter '>
                                <Button
                                    onClick={() => navigate(`/bookdetails/${book.id}`)}
                                    variant='info'
                                    className='w-75 workSans'
                                    >VER FICHA 
                                </Button>
                                <div 
                                    className="binBook"
                                    onClick={ () => handleDelete( book.id) }
                                >
                                    <Bin/>
                                </div>
                            </Card.Footer>
                        </Card>
                    </Col>
                )
            })}
        </Row>
    </Container>
    <ModalDeleteBook
        idToDelete={idToDelete}
        showModalDelete={showModalDelete}
        setShowModalDelete={setShowModalDelete}
        allBooks={allBooks}
        setAllBooks={setAllBooks}
    />
    </>
    
    )
}
