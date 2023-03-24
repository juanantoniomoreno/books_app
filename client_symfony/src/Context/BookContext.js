import React, { createContext, useState } from 'react'

export const BookContext = createContext();

export const BookProvider = (props) => {

    const [isEdit, setIsEdit] = useState(false);

    const initialCompleteBook = {
        isbn: '',
        title: '',
        subtitle: '',
        author: '',
        published: '',
        publisher: '',
        pages: 1,
        description: '',
        website: '',
        main_image: ''
    }

    return(
        <BookContext.Provider value={{
            initialCompleteBook,
            isEdit, 
            setIsEdit
        }}>
            { props.children }
        </BookContext.Provider>
    )
}


