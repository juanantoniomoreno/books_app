import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

export const FormValidationFormik = () => {

  const { book_id } = useParams();
  const [bookToEdit, setBookToEdit] = useState({});
  const [formSent, setFormSent] = useState(false)

  useEffect(() => {
    axios
      .get(`${URL_BOOK}/getBookInfo/${book_id}`)
      .then((res) => {
        console.log(res.data[0]);
        
        setBookToEdit( res.data[0] );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [book_id]);

    return (
    <Container className="minHeight">
      <h2 className="text-center mt-3 sourceSerifPro">Edit Book</h2>

      <Formik
        enableReinitialize={true}
        initialValues={
          bookToEdit
        }

        validate={ (valores) => {

          let errores = {}

          if(!valores.title){
            errores.title =  'title is required field';
          } 
          else if( ! /^[a-zA-ZÀ-ÿ\s]{1,40}$/.test( valores.title )){
            errores.title = 'title only letters and spaces'
          }

          if( !valores.isbn ){
            errores.isbn = 'isbn is a required field'
          }
          

          return errores;
        }}

        onSubmit={( valores, {resetForm} ) => {

            console.log( valores );
            resetForm()
            setFormSent(true)
            setTimeout(()=> setFormSent(false), 2000);
          
        }}
      >
        {/* {( {values, errors, touched, handleSubmit, handleChange, handleBlur } ) => ( */}
        {( { errors } ) => (
          <Form className="m-3 formBook">
            <Row>
              <Col>
                  <label htmlFor="is" className="workSans">ISBN</label>
                  <Field
                    id='is'
                    type="text"
                    name="isbn"
                    placeholder="isbn"
                  />
                  <ErrorMessage name="isbn" component={() => (
                      <div>{ errors.isbn }</div>
                  )}/>
                
              </Col>
              <Col>
                
                  <label htmlFor="tit" className="workSans">Title</label>
                  <Field
                    id='tit'
                    type="text"
                    name="title"
                    placeholder="title"
                  />
                  <ErrorMessage name="title" component={() => (
                      <div>{ errors.title }</div>
                  )}/>
              </Col>

              <Col>
                    <Field name='pais' as="select">
                      <option value='mexico'>México</option>
                      <option value='spain'>Españ</option>
                      <option value='argentina'>Argentina</option>
                    </Field>

              </Col>

              <Col>
                    <label>
                      <Field type="radio" name="sexo" value="hombre"/> Hombre
                    </label>
              </Col>
              <Col>
                    <label>
                      <Field type="radio" name="sexo" value="mujer"/> Mujer
                    </label>
              </Col>
            </Row>

            <Row>
              <Col>
                    <Field name="mensaje" as="textarea" placeholder="Mensaje" />
              </Col>
            </Row>

            <Button type="submit" variant="info" className="mt-4 workSans">
              Save Book
            </Button>
            {formSent && <p className="text-success">Form sent successfully</p> }
          </Form>
        )}
      </Formik>
    </Container>
  );
};
