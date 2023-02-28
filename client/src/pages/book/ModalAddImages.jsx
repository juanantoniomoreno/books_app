import axios from 'axios'
import React, { useState } from 'react'
import { Button, Image, Modal, Row } from 'react-bootstrap'
import { showAlertSuccessImages, URL_BOOK } from '../../utils/utils'


export const ModalAddImages = ({ book_id, showModalAddImages, setShowModalAddImages, setImages }) => {

    const [imagesToSave, setImagesToSave] = useState([]);

    const handleClose = () => {
        setShowModalAddImages( false );
        setImagesToSave([]);
    }

    const handleFile = ( event ) => {

        let newImgsToState = readMultiFiles( event );

        let newImages = [ ...imagesToSave ];

        newImgsToState.forEach((img) => {
            newImages.push(img)
        })

        setImagesToSave( newImages );
    }

    //console.log('IMÁGENES PARA GUARDAR', imagesToSave );

    const readMultiFiles = ( event ) => {
        const files = event.target.files;

        const arrayImages = [];

        Object.keys( files ).forEach( (ind) => {
            const file = files[ind];

            let url = URL.createObjectURL( file );

            arrayImages.push({ url, file })
        })
        return arrayImages;
    }

    //console.log( book_id );
    const onSubmit = () => {
        const newFormData = new FormData();  
        if( imagesToSave ) {
            for( const img of imagesToSave ){
                newFormData.append( 'file', img.file )
            }
        }    
        axios
            .post(`${URL_BOOK}/addImages/${book_id}`, newFormData)
            .then( (response) => {
                console.log( response );
                setImages( response.data );
                setImagesToSave([]);
                showAlertSuccessImages();
                setShowModalAddImages( false );
            })
            .catch( (error) => {
                console.log('ERROR AXIOS MODAL ADDIMAGE', error );
            })
    }  

  return (
    <Modal
        size="lg"
        show={ showModalAddImages }
        onHide={ handleClose }
    >
        <Modal.Header className='modalAddImage' closeButton>
            <h4 className='text-white sourceSerifPro'>Add Images</h4>
        </Modal.Header>
        <Modal.Body className='modalAddImage heightRowDeleteImage'>
            <Row>
                {imagesToSave?.map((image, ind) => {
                    return(
                        <Image
                            key={ind}
                            alt='book_image'
                            src={image.url}
                            style={{ width: '150px'}}
                        />
                    )
                })}
            </Row>
        </Modal.Body>
        <Modal.Footer className='modalAddImage workSans'>
            <Button 
                as="label" 
                variant="info" 
                className="me-3">
                <span>Select Images</span>
                <input hidden type="file" multiple onChange={ handleFile } />
            </Button>
            <Button 
                variant="warning"
                onClick={ onSubmit }
                >Save
            </Button>

        </Modal.Footer>
            <div>
            </div>
      </Modal>
  )
}
