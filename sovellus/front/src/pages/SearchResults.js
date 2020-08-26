import React from 'react'
import { useSelector } from 'react-redux'
import BookList from '../components/bookComponents/BookList'
import LoadingIcon from '../components/smallComponents/LoadingIcon'

const SearchResults = () => {
    const books = useSelector(state => state.books)
    const loadingIconReducer = useSelector(state => state.loadingIconReducer)

    if (loadingIconReducer === false && books.length === 0) {
        return (
            <LoadingIcon />
        )
    }

    if (loadingIconReducer === true) {
        return (
            <div className='text-align'>
                Ei hakuja. Aloita kirjoittamalla hakusanat hakukenttään.
            </div>
        )
    }

    return (
        <BookList 
            title='Hakutulokset' 
            books={books}
            styleIdentifier='trafficlights'
        />
    )
}

export default SearchResults