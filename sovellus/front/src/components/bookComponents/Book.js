import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'

import { linkStyleBookEntry } from '../../constants'
import { useSelector } from 'react-redux'

const Book = ({ book, styleIdentifier, singleBook, borrowed }) => {
    const usersBorrowedBooks = useSelector(state => state.user.loans)

    useEffect(() => {

    }, [book])

    if (!book) {
        return null
    }

    if (styleIdentifier === 'trafficlights') {
        let status = book.status

        usersBorrowedBooks.forEach(singleBook => {
            if (singleBook.id === book.id) {
                status = 'own-borrow'
            }
        })

        return(
            <Link to={`/${book.id}`} style={linkStyleBookEntry} key={book.id} className='flexbox space-between'>
                <div>
                    <div className='author'>{book.authorsShort} {book.publicationYear}</div>
                    <div className='title'>{book.title}</div>
                    <div className='horizontal-line' />
                </div>
                <div className={`ball ${status}`}/>
            </Link>
        )
    }

    if (borrowed === true) {
        return (
            <div>
                <div className='author'>Lainaaja:</div>
                <div className='author'>{book.borrower.name}</div>
                <div className='author'>{book.borrower.role}</div>
                <div className='horizontal-line' />
            </div>
        )
    }

    if (singleBook) {
        if (!book.publicationYear && !book.publisher) {
            return (
                <div>
                    <div className='author'>{book.authorsShort}</div>
                    <div className='title'>{book.title}</div>
                    <div className='horizontal-line' />
                </div>
            )
        }

        return (
            <div>
                <div className='author'>{book.authorsShort}</div>
                <div className='title'>{book.title}</div>
                <div className='author'>{book.publicationYear}, {book.publisher}</div>
                <div className='horizontal-line' />
            </div>
        )
    }

    return (
        <Link to={`/${book.id}`} style={linkStyleBookEntry} key={book.id}> 
            <div className='author'>{book.authorsShort} {book.publicationYear}</div>
            <div className='title'>{book.title}</div>
            <div className='horizontal-line' />
        </Link>
    )   
}

export default Book