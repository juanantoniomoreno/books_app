import React, { useState } from 'react'
import axios from 'axios'
import './book.css'
import { Button, Container, Form, Row, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { createAlert, URL_BOOK } from '../../utils/utils'
import { useNavigate } from 'react-router-dom'


export const CreateBook = () => {

  const [bookImage, setBookImage] = useState([]);
  const navigate = useNavigate();
  const { register, formState:{errors}, handleSubmit } = useForm();
  
  const handleFile = (event) => {
    setBookImage(event.target.files)
  }

  const onSubmit = ( regBook ) => { 
    
    const newFormData = new FormData();

    newFormData.append("regBook", JSON.stringify( regBook ));

    if( bookImage ){
      for( const img of bookImage ){
        newFormData.append("file", img)
      }
    }

    axios
      .post(`${URL_BOOK}/createBook`, newFormData)
      .then((response) => {
          //console.log(response);
          if(response){
            createAlert();
            navigate('/allbooks');
          }
        
      })
      .catch((error) => {
        console.log( error );
      })
  }
  
  return (
    <Container className='minHeight'>
      <h2 className='text-center mt-3 sourceSerifPro'>Create a New Book</h2>

      <Form className='m-3 formBook' onSubmit={ handleSubmit( onSubmit ) }>

        <Row>
          <Col>
            <Form.Group>
              <Form.Label className='workSans'>ISBN</Form.Label>
              <Form.Control
                type='text'
                name='isbn'
                placeholder='isbn'
                autoComplete='off'

                {...register ('isbn', {
                  required: {value: true, message: 'isbn is a required field'},
                  minLength: {value: 13, message: 'at least 13 numbers are required'},
                  maxLength: {value: 13, message: 'max 13 numbers are required'},
                  pattern: { value: /^978[0-9]+$/, message: 'isbn requires 13 numbers starting with 978'}
                })}
              />
              {errors.isbn && 
                <div className='text-danger'>
                  {errors.isbn.message}
                </div>
              }
            </Form.Group>
          
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className='workSans'>Title</Form.Label>
              <Form.Control
                type='text'
                name='title'
                placeholder='title'
                autoComplete='off'

                {...register ('title', {
                  required: {value: true, message: 'title is a required field'},
                  minLength: {value: 3, message: 'at least 3 characters are required'},
                  maxLength: {value: 150, message: 'maximun 150 characters'},
                  
                })}
              />
              {errors.title && 
                <div className='text-danger'>
                  {errors.title.message}
                </div>
              }
            </Form.Group>
          
          </Col>
        </Row>

        <Row className='mt-3'>
          <Col>
            <Form.Group >
              <Form.Label className='workSans'>SubTitle</Form.Label>
              <Form.Control
                type='text'
                name='subtitle'
                placeholder='subtitle'
                autoComplete='off'

                {...register ('subtitle', {
                  required: {value: true, message: 'subtitle is a required field'},
                  minLength: {value: 3, message: 'at least 3 characters are required'},
                  maxLength: {value: 150, message: 'maximun 150 characters'}
                })}
              />
              {errors.subtitle && 
                <div className='text-danger'>
                  {errors.subtitle.message}
                </div>
              }
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className='workSans'>Author</Form.Label>
              <Form.Control
                type='text'
                name='author'
                placeholder='author'
                autoComplete='off'

                {...register ('author', {
                  required: {value: true, message: 'author is a required field'},
                  minLength: {value: 3, message: 'at least 3 characters are required'},
                  maxLength: {value: 100, message: 'maximun 100 characters'},
                })}
              />
              {errors.author && 
                <div className='text-danger'>
                  {errors.author.message}
                </div>
              }
            </Form.Group>
          </Col>
        </Row>

        <Row className='mt-3'>
          <Col>
            <Form.Group>
              <Form.Label className='workSans'>Published</Form.Label>
              <Form.Control
                type='date'
                name='published'
                autoComplete='off'

                {...register ('published', {
                  required: {value: true, message: 'date is a required field'},
                })}
              />
              {errors.published && 
                <div className='text-danger'>
                  {errors.published.message}
                </div>
              }
            </Form.Group>
          </Col>
          <Col>
            <Form.Group >
              <Form.Label className='workSans'>Publisher</Form.Label>
              <Form.Control
                type='text'
                name='publisher'
                placeholder='publisher'
                autoComplete='off'

                {...register ('publisher', {
                  required: {value: true, message: 'publisher is a required field'},
                  minLength: {value: 3, message: 'at least 3 characters are required'},
                  maxLength: {value: 100, message: 'maximun 100 characters'},
                })}
              />
              {errors.author && 
                <div className='text-danger'>
                  {errors.author.message}
                </div>
              }
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className='workSans'>Pages</Form.Label>
              <Form.Control
                type='number'
                name='pages'
                placeholder='pages'
                autoComplete='off'
                min={1}
                max={20000}

                {...register ('pages', {
                  required: {value: true, message: 'pages is a required field'},
                  min: {value: 1, message: 'at least 1 page is required'},
                  max: {value: 20000, message: 'maximun 20000 pages'},
                })}
              />
              {errors.pages && 
                <div className='text-danger'>
                  {errors.pages.message}
                </div>
              }
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className='mt-3'>
          <Form.Label className='workSans'>Description</Form.Label>
          <Form.Control
            type='text'
            name='description'
            placeholder='description'
            autoComplete='off'

            {...register ('description', {
              required: {value: true, message: 'description is a required field'},
              minLength: {value: 3, message: 'at least 3 characters are required'},
              maxLength: {value: 65000, message: 'maximun 65000 characters'},
            })}
          />
          {errors.description && 
            <div className='text-danger'>
              {errors.description.message}
            </div>
          }
        </Form.Group>

        <Row className='mt-3'>
          <Col>
            <Form.Group>
              <Form.Label className='workSans'>Website</Form.Label>
              <Form.Control
                type='text'
                name='website'
                placeholder='website'
                autoComplete='off'

                {...register ('website', {
                  required: {value: true, message: 'website is a required field'},
                  pattern: {value: /^https?:\/\/[\w]+(\.[\w]+)+[/#?]?.*$/ , message: 'type a correct url: http:// ....'}
                })}
              />
              {errors.website && 
                <div className='text-danger'>
                  {errors.website.message}
                </div>
              }
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className='workSans'>Category</Form.Label>
              <Form.Control
                type='text'
                name='category'
                placeholder='category'
                autoComplete='off'

                {...register ('category', {
                  required: {value: true, message: 'category is a required field'},
                  minLength: {value: 3, message: 'at least 3 characters are required'},
                  maxLength: {value: 50, message: 'maximun 50 characters'}
                  //pattern: {value: /^[a-z]+$/u, message: 'only one word lowercase no blanks no special characters' }
                })}
              />
              {errors.category && 
                <div className='text-danger'>
                  {errors.category.message}
                </div>
              }
            </Form.Group>
          </Col>
        </Row>

        <Row className='mt-3'>
          <Col sm={5} >
            <Form.Group >
              <Form.Label className='workSans'>Add Image</Form.Label>
              <Form.Control
                type='file'
                onChange={handleFile}
                accept="image/png, .jpeg, .jpg, image/gif"
              />
            </Form.Group>
          </Col>
        </Row>

        <Button type='submit' variant='info' className='mt-4 workSans'>
          Save Book
        </Button>
      </Form>
      

    </Container>
  )
}
