import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Button from '../components/smallComponents/Button'
import BookList from '../components/bookComponents/BookList'
import LoadingIcon from '../components/smallComponents/LoadingIcon'
import { linkStyle } from '../constants'

//TODO
//Lisää server listener, jotta muutokset päivittyvät automaattisesti
//(myös etusivu)

//TODO
//keksi muuta metriikkaa näytettäväksi

const PersonalInfo = () => {
    const user = useSelector(state => state.user)

    let borrowTimeTotal = 0
    const currentDate = Date.parse(new Date())
    
    if (user.loans) {
        user.loans.forEach(book => {
            const milliseconds = Date.parse(book.borrowDate)
            borrowTimeTotal += currentDate - milliseconds
        })
    }    

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
                <div>Laina-ajat yhteensä:{' '} 
                    {Math.round((borrowTimeTotal / 86400000) * 10) / 10} päivää</div>
            </div>
        </div>
    )
}

export default PersonalInfo