import React from 'react'

const BookList = (props) => {
    return (
        <div className='body flexbox'>
            <div> 
                <h4>{props.title}</h4>
                {props.books.map(book =>
                        <div key={book.id}>
                            <div> 
                                <div className='author'>{book.authors} {book.publicationYear}</div>
                                <div className='title'>{book.title}</div>
                                <div className='horizontal-line' />
                            </div>   
                        </div>
                )}
            </div>
            <div className={props.color}></div> 
        </div>
    )
}

export default BookList