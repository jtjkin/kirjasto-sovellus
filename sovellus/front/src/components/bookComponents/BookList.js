import React from 'react'
import Book from './Book'

const BookList = (props) => {
    if (props.styleIdentifier === undefined) {
        return (
            <div className='body flexbox'>
                <div> 
                    <h4>{props.title}</h4>
                    {props.books.map(book =>
                        <Book key={book.id} book={book} />
                    )}
                </div>
                <div className={props.color} />
            </div>
        )
    }

    //TODO pallo
    return (
        <div className='body flexbox'>
            <div> 
                <h4>{props.title}</h4>
                {props.books.map(book =>
                    <Book 
                        key={book.id} 
                        book={book} 
                        styleIdentifier={props.styleIdentifier}
                    />
                )}
            </div>
        </div>
    )
}

export default BookList