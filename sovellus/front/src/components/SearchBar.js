import React, { useState } from 'react'

const SearchBar = () => {
    const [searchterms, setSearchterms] = useState('')

    const submit = (event) => {
        event.preventDefault()
        //REMOVE
        console.log(searchterms)

        //TODO
        //hae redux-listasta ja näytä listaa jo hakiessa
        //nappia painaessa heitä haku-sivulle, jossa tulokset

        setSearchterms('')
    }

    //TODO
    //renderöi hakunappi kun inputissa tekstiä
    //inputissa placeholder-teksti, joka häipyy kun klikkaa
    //inputin background color animointi harmaasta valkoiseen

    return (
        <form onSubmit={submit} className='flexbox center'>
        <input className='border-input'
        value={searchterms}
        onChange={({target}) => setSearchterms(target.value)} />
        </form>
    )
}

export default SearchBar