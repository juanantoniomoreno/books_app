import axios from 'axios'
import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { URL_BOOK } from '../../utils/utils'

export const ModalDeleteBook = ({ showModalDelete, setShowModalDelete, idToDelete, allBooks, setAllBooks }) => {

    const deleteBook = (id) => {
        let newBookList = allBooks.filter((book) => book.book_id !== id );

        axios
            .put(`http://localhost:8000/ws/books/delete-book/${id}`)
            .then( (response) => {
                //console.log(response);
                setShowModalDelete( false );
                setAllBooks( newBookList );
            })
            .catch((error) => {
                console.log('ERROR ELIMINAR LIBRO', error );
            })
    }

    console.log(idToDelete);
    console.log(allBooks);

  return (
    <Modal
        show={showModalDelete}
        onHide={()=>setShowModalDelete(false)}
        backdrop="static"
        keyboard={false}
    >
        <Modal.Body>
            <h5 className='text-black sourceSerifPro'>Are you sure you want to delete this book?</h5>
        </Modal.Body>
        <Modal.Footer className='workSans'>
            <Button 
                style={{backgroundColor: 'rgb(48,162,185)', border: 'none'}} 
                size='sm'
                onClick={()=>setShowModalDelete(false)}
                >No, Cancel
            </Button>
            <Button 
                style={{backgroundColor: 'rgb(61,62,77)', border: 'none'}} 
                size='sm'
                onClick={() => deleteBook(idToDelete) }
                >Yes, Delete
            </Button>
        </Modal.Footer>
    </Modal>
  )
}
