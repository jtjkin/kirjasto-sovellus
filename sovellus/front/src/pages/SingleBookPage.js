import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import booksService from '../services/booksService'
import { addBook } from '../reducers/singleBookReducer'

const SingleBookPage = () => {
    const book = useSelector(state => state.singleBook)
    const urlId = useParams().id
    const dispatch = useDispatch()

    useEffect( () => {
        if (urlId !== 'lisaa-uusi') {

            const findBook = async () => {
                const fetchedBook = await booksService.getBookById(urlId) 
                dispatch(addBook(fetchedBook))
            }

            findBook()
            
        }
    }, [dispatch]) //eslint-disable-line

    if (book.id !== urlId) {
        return null
    }

    //TODO
    //muotoilu
    //testidata: http://localhost:3000/5f2088007b4d66413877149e
    return (
        <div>
            {book.title}
            {book.authors}
            {book.publicationYear}
        </div>
    )
}

export default SingleBookPage