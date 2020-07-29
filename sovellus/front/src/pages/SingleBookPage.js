import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import booksService from '../services/booksService'
import { addBook } from '../reducers/singleBookReducer'

import BookList from '../components/bookComponents/BookList'
import SingleBookPageButtons from '../components/bookComponents/SingleBookPageButtons'

const SingleBookPage = () => {
    const book = useSelector(state => state.singleBook)
    const urlId = useParams().id
    const dispatch = useDispatch()

    useEffect( () => {
        if (urlId !== 'lisaa-uusi' && urlId !== 'hakutulokset' && urlId !== 'tietoja-sovelluksesta') {

            const findBook = async () => {
                const fetchedBook = await booksService.getBookById(urlId) 
                dispatch(addBook(fetchedBook))
            }

            findBook()
            
        }
    }, [urlId]) //eslint-disable-line

    if (book.id !== urlId || !urlId) {
        return null
    }

    //TODO
    //Korjausmahdollisuus 60 min
    //superuser-button
    //testidata: http://localhost:3000/5f2088007b4d66413877149e
    return (
        <div>
            <BookList 
                title='Julkaisun tiedot'
                books={[book]}
                color='green'
                singleBook={true}
            />

            <SingleBookPageButtons status={book.status}/>
        </div>
    )
}

export default SingleBookPage