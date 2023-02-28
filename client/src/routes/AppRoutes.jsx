import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Footer } from '../components/Footer'
import { NavBar } from '../components/NavBar'
import { AllBooks } from '../pages/book/AllBooks'
import { BeforeThirteen } from '../pages/book/BeforeThirteen'
import { BookDetails } from '../pages/book/BookDetails'
import { CreateBook } from '../pages/book/CreateBook'
import { Drama } from '../pages/book/Drama'
import { ValidationReackHook } from '../pages/book/ValidationReactHook'
import { Home } from '../pages/home/Home'


export const AppRoutes = () => {
  return (
    <BrowserRouter>
        <NavBar/>

        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/allbooks' element={<AllBooks />}/>
            <Route path='/oldbooks' element={<BeforeThirteen />}/>
            <Route path='/dramabooks' element={<Drama/>} />

            <Route path='/createbook' element={<CreateBook/>}/>
            <Route path='/bookdetails/:book_id' element={<BookDetails />}/>
            <Route path='/editbook/:book_id' element={<ValidationReackHook />}/>

        </Routes>

        <Footer/>
    </BrowserRouter>
  )
}
