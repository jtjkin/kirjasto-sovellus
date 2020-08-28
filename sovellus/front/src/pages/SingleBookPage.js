import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import booksService from '../services/booksService'
import { addBook } from '../reducers/singleBookReducer'

import BookList from '../components/bookComponents/BookList'
import SingleBookPageButtons from '../components/bookComponents/SingleBookPageButtons'
import BackButton from '../components/smallComponents/BackButton'

const SingleBookPage = () => {
    const book = useSelector(state => state.singleBook)
    const urlId = useParams().id
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect( () => {
        if (urlId !== 'lisaa-uusi' && 
            urlId !== 'hakutulokset' && 
            urlId !== 'tietoja-sovelluksesta' &&
            urlId !== 'omat-tiedot' &&
            urlId !== 'paivita-tietoja' &&
            urlId !== 'haku' &&
            urlId !== 'admin' &&
            urlId !== undefined) {

            const findBook = async () => {

                try {
                    const fetchedBook = await booksService.getBookById(urlId)
                    dispatch(addBook(fetchedBook))
                } catch (error){
                    if (error.response.status === 404) {
                        history.push('/')
                    }
                }

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
            <BackButton />
            <BookList 
                title='Julkaisun tiedot'
                books={[book]}
                color='green'
                singleBook={true}
            />

            <SingleBookPageButtons status={book?.status}/>
        </div>
    )
}

export default SingleBookPage