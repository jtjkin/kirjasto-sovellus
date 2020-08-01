import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import $ from 'jquery'

import bookService from '../../services/booksService'
import { addBook } from '../../reducers/singleBookReducer'
import { updateUser } from '../../reducers/userReducer'

import Button from '../smallComponents/Button'
import BookList from '../bookComponents/BookList'
import LoadingIcon from '../smallComponents/LoadingIcon'

const SingleBookPageButtons = () => {
    const book = useSelector(state => state.singleBook)
    const user = useSelector(state => state.user)
    const [returnButtonText, setReturnButtontext] = useState('Palauta')
    const [confirmReturn, setConfirmReturn] = useState(null)
    const [listOfReservations, setListOfReservations] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        if (user.reservations?.length > 0) {
            const listOfUserReservationIds = user.reservations.map(
                reservation => reservation.id
            )

            setListOfReservations(listOfUserReservationIds)
        }
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
        console.log(result)
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

    const cancelReservation = async () => {
        const result = await bookService.cancelReservation(book.id)
        dispatch(addBook(result.updatedBook))
        dispatch(updateUser(result.updatedUser))

        const listOfUserReservationIds = result.updatedUser.reservations.map(
            reservation => reservation.id
        )

        setListOfReservations(listOfUserReservationIds)
    }

    const Reserved = () => {
        if (book.reserver.length > 0) {
            return (
                <div className='flexbox column reservation-info'>
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
                <div className='flexbox column'>
                    <div className='text-align reserved-message'>Julkaisu on varauksessa</div>
                    <Button label='Peru varaus' onClick={cancelReservation}/>
                </div>
            )
        }

        return (
            <Button label='Varaa' onClick={reserve}/>
        )
    }

    if (!book.id) {
        return (
            <LoadingIcon />
        )
    }

    if(book.status === 'free') {
        return (
            <div className='flexbox column'>
                <Button label='Lainaa' onClick={borrow}/>
                <Reserved />
            </div>
        )
    }


    if (book.status === 'borrowed') {
        if(book.borrower.id === user.id) {
            //TODO
            //palautusnapin vahvistuksen animointi

            return (
                <div className='flexbox column'>
                    <BookList 
                        title='Lainassa'
                        books={[{id: 1, authorsShort: 'Oma laina'}]}
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

    if (book.status === 'reserved' && listOfReservations.includes(book.id)) {
        return (
            <div>
                <Reserved />

                <div className='flexbox column'>
                    <Button label='Lainaa' onClick={borrow}/>
                    <Button label='Peru varaus' onClick={cancelReservation}/>
                </div>
            </div>
        )
    }

    //Should not enter here. Left as a fail safe.
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