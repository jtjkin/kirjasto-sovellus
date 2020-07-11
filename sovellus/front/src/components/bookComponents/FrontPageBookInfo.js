import React from 'react'
import { useSelector } from 'react-redux'
import BookList from './BookList'

const FrontPageBookInfo = (props) => {
    const books = useSelector(state => state.books)

    if (props.id === "arrived") {
        //TODO
        //hae reduxista saapuneiden tiedot
        const arrived = books
        return (
            <BookList 
                title={props.title} 
                books={arrived}
                color='blue'/>
        )
    }

    if (props.id === "reservations") {
        //TODO
        //hae reduxista voimassaolevat varaukset
        const reservations = books

        return (
            <BookList 
                title={props.title} 
                books={reservations}
                color='yellow'/>
        )
    }

    if (props.id === "returns") {
        //TODO
        //hae reduxista voimassaolevat varaukset
        const returns = books

        return (
            <BookList 
                title={props.title} 
                books={returns}
                color='red'/>
        )
    }

    return null
}

export default FrontPageBookInfo