import React from 'react'
import Book from './Book'

const BookList = (props) => {
    if (!props.books) {
        return null
    }

    if (props.styleIdentifier === undefined) {
        const style = `${props.color} bar`

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
                    <div className={style} />
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
                <div className={style} />
            </div>
        )
    }

    //TODO pallo
    return (
        <div className='body flexbox' id={props.title}>
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