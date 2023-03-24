import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { URL_BOOK } from '../../utils/utils';
import { DisplayerBooks } from './DisplayerBooks';
import './book.css'

export const AllBooks = () => {

  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    
    axios
      .get(`${URL_BOOK}/getAllBooks`)
      .then((response) => {
        setAllBooks( response.data );
      })
      .catch((error) => {
        console.log(error);
      })

  }, [])
  
  return (
    <>
      <h3 className='sourceSerifPro'>All My Books</h3>
      <DisplayerBooks 
        allBooks={ allBooks }
        setAllBooks = { setAllBooks }
      />
    </>
  )
}
