import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { URL_BOOK } from '../../utils/utils'
import { DisplayerBooks } from './DisplayerBooks'
import './book.css'

export const BeforeThirteen = () => {

  const [oldBooks, setOldBooks] = useState([]);

  useEffect(() =>{

    axios
      .get(`${URL_BOOK}/getBooksBeforeThirteen`)
      .then((response) => {
        setOldBooks( response.data );
      })
      .catch((error) => {
        console.log(error);
      })

  }, [])

  return (
    <>
      <h3 className='sourceSerifPro'>Books Before 2013</h3>
      <DisplayerBooks
        allBooks={ oldBooks }
        setAllBooks={ setOldBooks }
      />
    </>
  )
}
