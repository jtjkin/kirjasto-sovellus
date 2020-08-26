import React from 'react'
import BookList from './BookList'

const FrontPageBookInfo = (props) => (
            <BookList 
                title={props.title} 
                books={props.books}
                color={props.color}/>
)

export default FrontPageBookInfo