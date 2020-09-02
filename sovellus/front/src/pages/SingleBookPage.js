import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import booksService from '../services/booksService'
import { addBook } from '../reducers/singleBookReducer'

import BookList from '../components/bookComponents/BookList'
import SingleBookPageButtons from '../components/bookComponents/SingleBookPageButtons'
import BackButton from '../components/smallComponents/BackButton'
import Button from '../components/smallComponents/Button'
import SaveNew from './SaveNew'

const SingleBookPage = () => {
    const book = useSelector(state => state.singleBook)
    const admin = useSelector(state => state.user.admin)
    const [inModify, setInModify] = useState(false)
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

    const modifyBookEntry = () => {
        setInModify(true)
    }

    if (book.id !== urlId || !urlId) {
        return null
    }

    if (inModify) {
        return (
            <SaveNew book={book} referredFromSingleBookPage={true} setInModify={setInModify}/>
        )
    }

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
            
                {admin ? 
                    <div className='flexbox column'>
                        <div className='reserved-message text-align'>Admin-paneeli</div>
                        <Button label='Muokkaa tietoja' color='yellow' onClick={modifyBookEntry}/>
                    </div>  

                    : null}
            
        </div>
    )
}

export default SingleBookPage