import React from 'react'
import Book from './Book'

const BookList = (props) => {

    if (!props.books) {
        return null
    }

    if (props.styleIdentifier === undefined) {
        if (props.borrowed === true) {

            return (
                <div className='body flexbox space-between' id={props.color}>
                    <div className='flex-grow'> 
                        <h4 className='red-text'>{props.title}</h4>
                        {props.books.map(book =>
                            <Book 
                                key={book.id} 
                                book={book} 
                                singleBook={props.singleBook}
                                borrowed={props.borrowed}
                            />
                        )}
                    </div>
                    <div className={`${props.color} bar`} />
                </div>
            )
        }

        return (
            <div className='body flexbox space-between' id={props.color}>
                <div className='flex-grow'> 
                    <h4>{props.title}</h4>
                    {props.books.map(book =>
                        <Book key={book.id} book={book} singleBook={props.singleBook}/>
                    )}
                </div>
                <div className={`${props.color} bar`} />
            </div>
        )
    }

    return (
        <div className='body flexbox' id={props.title}>
            <div> 
                <h4>{props.title}</h4>
                <div>
                    {props.books.map(book =>
                        <Book 
                            key={book.id} 
                            book={book} 
                            styleIdentifier={props.styleIdentifier}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default BookList