import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Button from '../components/smallComponents/Button'
import BookInfo from '../components/bookComponents/BookInfo'
import { linkStyle } from '../constants'

//TODO
//Hae palautus ym. tiedot reduxista
//Lisää server listener, jotta muutokset päivittyvät automaattisesti
//(myös etusivu)

//TODO
//hae reduxista laina-ajat yhteensä
//keksi muuta metriikkaa näytettäväksi

const PersonalInfo = () => {
    const books = useSelector(state => state.books)

    return (
        <div>
            <Link to='/paivita-tietoja' className='flexbox column' style={linkStyle}> 
                <Button label='Päivitä omia tietoja'/>
            </Link>

            <BookInfo title="Palautuspyynnöt" id="returns"/>
            <BookInfo title="Varaukset" id="reservations"/>
            <BookInfo title="Omat lainat" id="loans"/>
            
            <div className='body'>
                <div>Lainoja yhteensä: {books.length}</div>
                <div>Laina-ajat yhteensä: XXX päivää</div>
            </div>
        </div>
    )
}

export default PersonalInfo