import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Image, Row, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { BookContext } from "../../Context/BookContext";
import { Bin, toDate, URL_BOOK } from "../../utils/utils";
import "./book.css";
import { ModalAddImages } from "./ModalAddImages";
import { ModalDeleteImage } from "./ModalDeleteImage";

export const BookDetails = () => {
  const { initialCompleteBook, setIsEdit } = useContext(BookContext);

  const { book_id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(initialCompleteBook);
  const [images, setImages] = useState([]);
  const [showModalAddImages, setShowModalAddImages] = useState(false);
  const [showModalDelImg, setShowModalDelImg] = useState(false);
  const [idImgToDelete, setIdImgToDelete] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/ws/books/getBook-${book_id}`)
      .then((response) => {
        console.log( response );
        setBook(response.data.book );
        setImages(response.data.images);
      })
      .catch((error) => {
        console.log('ERROR AXIOS BOOKDETAILS', error);
      });
  }, [book_id]);

  const handleAddImage = () => {
    setShowModalAddImages( true );
  }

  const handleEditBook = () => {
    setIsEdit(true);
    navigate(`/editbook/${book_id}`)
  }

  const handleDeleteImage = (id) => {
    setShowModalDelImg( true );
    setIdImgToDelete( id );
  }

  //console.log( 'BOOOKKK', book );
  //console.log( 'IMÁGENES DE LA VISTA DETAILS', images );

  return (
    <>
      <Container className="minHeight bookDetails">
      <Row>
        <Col sm={6} lg={4} className="divMainImage">
          <Image
            className="mainImage"
            src={`/images/book/${book?.main_image}`}
          />
        </Col>
        <Col sm={6} lg={5} className="midCol">
          <h1 className="titleBook">{book?.title.toUpperCase()}</h1>
          <h2 className="subTitle">{book?.subtitle}</h2>
          <h4 className="text-info fw-bold author">{book?.author.toUpperCase()}</h4>
          <div className="d-flex pt-2 publisher">
            <h5 className="pe-2">{book?.publisher.toUpperCase()} </h5>
            <h5> - {book?.isbn}</h5>
          </div>
          <div className="pt-2 "><span className="category">{book?.category}</span></div>
          <h5 className="pt-4 descriptionTitle">Description of {book?.title.toUpperCase()}</h5>
          <p className="pt-2 description">{book?.description}</p>
        </Col>
        <Col sm={6} lg={3} >
          <div className="otherInfo">
            <h6>Published: {toDate(book?.published)}</h6>
            <h6>Pages: {book?.pages}</h6>
            <h6>
              Visit the site{" "}
              <a
                className="fw-bold text-info"
                href={book?.website}
                target="_blank"
                rel="noreferrer"
              >here
              </a>
            </h6>
          </div>
          <div className="pt-3 workSans">
            <Button onClick={ handleAddImage } variant="info">
              Add Images
            </Button>
            <Button onClick={ handleEditBook } variant="secondary" className="ms-2">
              Edit Book
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="pt-4 descriptionTitle">
        <Col>
          <h4>Images of { book?.title.toUpperCase() } </h4>
        </Col>
      </Row>

      <Row xs={1} sm={2} md={4} className="g-5 pt-3">
        {images.map( (img, indx) => {
          return(
            <Col key={ indx }>
              <Card className="h-100">
                <Card.Img src={`/images/book/${img.title}`} className='imgDetail'/>
                <Card.ImgOverlay >
                  <div className='binRemoveImg' onClick={() => handleDeleteImage(img.image_id)}> 
                    <Bin/>
                  </div>
                </Card.ImgOverlay>
              </Card>
            </Col>
          )
        })}
      </Row>

    </Container>
    <ModalAddImages 
      book_id={ book_id }
      showModalAddImages={ showModalAddImages }
      setShowModalAddImages={ setShowModalAddImages }
      setImages={setImages}
    />

    <ModalDeleteImage
      showModalDelImg={showModalDelImg}
      setShowModalDelImg={setShowModalDelImg}
      setImages={setImages}
      images={images}
      idImgToDelete={idImgToDelete}
    />
    </>
    
  );
};
