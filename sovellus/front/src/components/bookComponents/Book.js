import React, {useEffect} from 'react'

const Book = ({ book, styleIdentifier, singleBook, borrowed }) => {

    useEffect(() => {

    }, [book])

    if (!book) {
        return null
    }

    if (styleIdentifier === 'trafficlights') {
        return(
            <div>
                <div>
                    <div className='author'>{book.authorsShort} {book.publicationYear}</div>
                    <div className='title'>{book.title}</div>
                    <div className='horizontal-line' />
                </div>
                <div className='ball b-blue'/>
            </div>
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
        <div> 
            <div className='author'>{book.authorsShort} {book.publicationYear}</div>
            <div className='title'>{book.title}</div>
            <div className='horizontal-line' />
        </div>
    )   
}

export default Book