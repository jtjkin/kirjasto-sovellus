import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Button from '../components/smallComponents/Button'
import BookList from '../components/bookComponents/BookList'
import LoadingIcon from '../components/smallComponents/LoadingIcon'
import { linkStyle } from '../constants'

//TODO
//Hae palautus ym. tiedot reduxista
//Lisää server listener, jotta muutokset päivittyvät automaattisesti
//(myös etusivu)

//TODO
//laina-aika esille kirjakohtaisesti
//kehoitus palautuksesta jos kirjalla varaaja ja laina-aika > 30pvä (etusivu: alert)
//hae reduxista laina-ajat yhteensä
//keksi muuta metriikkaa näytettäväksi

const PersonalInfo = () => {
    const user = useSelector(state => state.user)

    if (!user.id) {
        return (
            <LoadingIcon />
        )
    }

    return (
        <div>
            <Link to='/paivita-tietoja' className='flexbox column' style={linkStyle}> 
                <Button label='Päivitä omia tietoja'/>
            </Link>

            <BookList 
                title='Palautuspyynnöt' 
                books={user.returnRequests}
                color='red'/>

            <BookList 
                title='Varaukset' 
                books={user.reservations}
                color='yellow'/>
            
            <BookList 
                title='Omat lainat' 
                books={user.loans}
                color='blue'/>
            
            <div className='body'>
                <div>Lainoja yhteensä: {user.loans.length}</div>
                <div>Laina-ajat yhteensä: XXX päivää</div>
            </div>
        </div>
    )
}

export default PersonalInfo