import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { URL_BOOK } from '../../utils/utils';
import { DisplayerBooks } from './DisplayerBooks';
import './book.css'

export const Drama = () => {

  const [dramaBooks, setDramaBooks] = useState([]);

  useEffect(() =>{

    axios
      .get(`${URL_BOOK}/getBooksDrama`)
      .then((response) => {
        setDramaBooks( response.data );
      })
      .catch((error) => {
        console.log( error );
      })
  }, [])

  return (
    <>
    <h3 className='sourceSerifPro'>Drama Books</h3>
    <DisplayerBooks
      allBooks={ dramaBooks }
      setAllBooks = { setDramaBooks }
    />
    </>
  )
}
