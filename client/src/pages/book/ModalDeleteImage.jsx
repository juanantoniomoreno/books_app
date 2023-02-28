import axios from 'axios'
import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { URL_BOOK } from '../../utils/utils'

export const ModalDeleteImage = ({ showModalDelImg, setShowModalDelImg, idImgToDelete, images, setImages }) => {

    const deleteImage = () => {
        let newImgsArr = images.filter( (img) => img.image_id !== idImgToDelete );
    
        axios
            .put(`${URL_BOOK}/deleteImage/${idImgToDelete}`)
            .then( (response) => {
                setImages( newImgsArr );
                setShowModalDelImg( false );
            })
            .catch((error) => {
                console.log( error );
            })
    }

  return (
    <Modal
        show={showModalDelImg}
        onHide={()=>setShowModalDelImg(false)}
        backdrop="static"
        keyboard={false}
    >
        <Modal.Body>
            <h5 className='text-black sourceSerifPro'>Are you sure you want to delete this image?</h5>
        </Modal.Body>
        <Modal.Footer className='workSans'>
            <Button 
                style={{backgroundColor: 'rgb(48,162,185)', border: 'none'}} 
                size='sm'
                onClick={()=>setShowModalDelImg(false)}
                >No, Cancel
            </Button>
            <Button 
                style={{backgroundColor: 'rgb(61,62,77)', border: 'none'}} 
                size='sm'
                onClick={ deleteImage }
                >Yes, Delete
            </Button>
        </Modal.Footer>
    </Modal>
  )
}

