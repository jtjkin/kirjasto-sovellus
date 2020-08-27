import React, { useState } from 'react'
import booksService from '../services/booksService'
import { searchResults, clear } from '../reducers/bookReducer'
import { setLoadingIcon, setSearchMetaData, setSearchTerms } from '../reducers/searchMetaDataReducer'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons'

library.add(faArrowAltCircleRight)

const SearchBar = () => {
    const [searchterms, setSearchterms] = useState('HAE')
    const history = useHistory()
    const dispatch = useDispatch()

    const checkPlaceholder = (event) => {
        event.preventDefault()

        if (event.target.value === 'HAE') {
            setSearchterms('')
        }
    }

    const submit = async (event) => {
        event.preventDefault()

        dispatch(setLoadingIcon())
        dispatch(setSearchTerms(searchterms))
        setSearchterms('HAE')
        dispatch(clear())
        history.push('/hakutulokset')

        const result = await booksService.searchBooks(searchterms)
        dispatch(setSearchMetaData(result))
        dispatch(searchResults(result.books))

        //TODO
        //hae parin kirjaimen jälkeen backistä ja näytä listaa jo hakiessa
    }

    let style = {
        color: 'rgb(0, 0, 0)',
    }

    if (searchterms === 'HAE') {
        style = {
            color: 'darkgrey',
            fontWeight: 'bold'
        }
    }

    const searchButtonStyle = {
        color: 'rgb(121, 212, 168)',
        verticalAlign: 'middle',
        marginBottom: '4px'
    }

    const SearchButton = () => {
        if (searchterms === 'HAE' || searchterms === '') {
            return null
        }

        return (
            <FontAwesomeIcon 
                icon={faArrowAltCircleRight} 
                size='2x'
                style={searchButtonStyle} 
                title='search'
                onClick={submit} />
        )
    }

    return (
        <form onSubmit={submit} className='flexbox center'>
        <div className='border-input-searchbar' onClick={checkPlaceholder}>
            <input className='searchbar'
                style={style}
                value={searchterms}
                onChange={({target}) => setSearchterms(target.value)} />
            <SearchButton />

        </div>
        </form>
    )
}

export default SearchBar