import React from 'react'
import { useSelector } from 'react-redux'
import BookList from '../components/bookComponents/BookList'

const SearchResults = () => {
    //TODO
    //tallenna hakutulokset reduxiin
    //hae hakutulokset reduxista
    const books = useSelector(state => state.books)

    //TODO
    //älä poista edellistä hakua, mutta jos poistuttu sivulta
    //lisää palatessa tiedote, jossa edellisen haun hakusanat ja aika kuinka
    //kauan sitten haettu

    return (
        <BookList 
            title='Hakutulokset' 
            books={books}
            styleIdentifier='trafficlights'
        />
    )
}

export default SearchResults