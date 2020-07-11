import React from 'react'

const Book = ({ book, styleIdentifier }) => {
    if (styleIdentifier === 'trafficlights') {
        return(
            <div>
                <div>
                    <div className='author'>{book.authors} {book.publicationYear}</div>
                    <div className='title'>{book.title}</div>
                    <div className='horizontal-line' />
                </div>
                <div className='ball b-blue'/>
            </div>
        )
    }

    return (
        <div> 
            <div className='author'>{book.authors} {book.publicationYear}</div>
            <div className='title'>{book.title}</div>
            <div className='horizontal-line' />
        </div>
    )   
}

export default Book