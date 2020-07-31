import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BookList from '../components/bookComponents/BookList'
import { initSearchResults } from '../reducers/bookReducer'

const SearchResults = () => {
    const books = useSelector(state => state.books)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initSearchResults())
    }, [dispatch])

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