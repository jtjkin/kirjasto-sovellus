import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import $ from 'jquery'

import bookService from '../../services/booksService'
import { addBook } from '../../reducers/singleBookReducer'
import { updateUser } from '../../reducers/userReducer'

import Button from '../smallComponents/Button'
import BookList from '../bookComponents/BookList'

const SingleBookPageButtons = ({status}) => {
    const book = useSelector(state => state.singleBook)
    const user = useSelector(state => state.user)
    const [returnButtonText, setReturnButtontext] = useState('Palauta')
    const [confirmReturn, setConfirmReturn] = useState(null)
    const [listOfReservations, setListOfReservations] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        setListOfReservations(user.reservations)
    }, [user])

    const borrow = async () => {
        //TODO
        //virheidenkäsittelijä
        const result = await bookService.borrowBook(book.id)
        dispatch(addBook(result.updatedBook))
        dispatch(updateUser(result.updatedUser))
        setConfirmReturn(null)
        setReturnButtontext('Palauta')
    }

    const reserve = async () => {
        //TODO
        //virheidenkäsittelijä
        const result = await bookService.reserveBook(book.id)
        dispatch(addBook(result.updatedBook))
        dispatch(updateUser(result.updatedUser))
    }

    const setReturn = () => {
        if (confirmReturn !== null) {
            setReturnButtontext('Palauta')
            setConfirmReturn(null)
            return
        } 

        setReturnButtontext('Peruuta')
        setConfirmReturn('Vahvista palautus')
    }

    const returnBook = async () => {
        //TODO
        //virheidenkäsittelijä
        const result = await bookService.returnBook(book.id)
        dispatch(addBook(result.updatedBook))
        dispatch(updateUser(result.updatedUser))
    }

    //TODO
    //poista varaus
    //varausten näyttäminen kun status: free

    const Reserved = () => {
        if (book.reserver.length > 0) {
            return (
                <div className='flexbox column'>
                    <div className='align-self'>
                        Voimassaolevia varauksia: {book.reserver.length}
                    </div>
                </div>
            )
        }

        return null
    }
    const ReserveButton = () => {
        if (listOfReservations.includes(book.id)) {
            return (
                <div className='text-align reserved-message'>Julkaisu on varauksessa</div>
            )
        }

        return (
            <Button label='Varaa' onClick={reserve}/>
        )
    }

    if(status === 'free') {
        return (
            <div className='flexbox column'>
                <Button label='Lainaa' onClick={borrow}/>
            </div>
        )
    }


    if (status === 'borrowed') {
        if(book.borrower.userId === user.id) {
            //TODO
            //palautusnapin vahvistuksen animointi

            return (
                <div className='flexbox column'>
                    <BookList 
                        title='Lainassa'
                        books={[{id: 1, author: 'Oma laina'}]}
                        color='yellow'
                        singleBook={true}
                    />

                    <Reserved />

                    <div className='flexbox column'>
                        <Button 
                            label={returnButtonText} 
                            color='yellow' 
                            onClick={setReturn}
                        />
                        <Button 
                            label={confirmReturn}
                            color='red' 
                            onClick={returnBook}
                        />
                    </div>
                </div>
            )
        }


        return (
            <div className='flexbox column'>
                <BookList 
                    title='Lainassa'
                    books={[book]}
                    color='red'
                    singleBook={true}
                    borrowed={true}
                />

                <Reserved />

                <ReserveButton />
            </div>
        )
    }

    return (
        <div>
            <Reserved />

            <div className='flexbox column'>
                <Button label='Lainaa' onClick={borrow}/>
            </div>
        </div>
    )
}

export default SingleBookPageButtons