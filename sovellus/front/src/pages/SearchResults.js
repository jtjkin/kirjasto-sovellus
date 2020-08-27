import React from 'react'
import { useSelector } from 'react-redux'
import BookList from '../components/bookComponents/BookList'
import LoadingIcon from '../components/smallComponents/LoadingIcon'

const SearchResults = () => {
    const books = useSelector(state => state.books)
    const metaData = useSelector(state => state.searchMetaData)

    if (metaData.loadingIconState === true) {
        return (
            <div className='text-align'>
                Ei hakuja. Aloita kirjoittamalla hakusana /-sanat hakukenttään.
            </div>
        )
    }

    if (metaData.notFound === true) {
        return (
            <div className='text-align'>
                Ei hakutuloksia hakusanoilla: '{metaData.searchterms}'
            </div>
        )
    }

    if (metaData.loadingIconState === false && books.length === 0) {
        return (
            <LoadingIcon />
        )
    }

    return (
        <div>
            <div className='text-align margin-bottom'>
                Hakusanat: '{metaData.searchterms}'
            </div>
            <BookList 
                title='Hakutulokset' 
                books={books}
                styleIdentifier='trafficlights'
            />
        </div>
    )
}

export default SearchResults