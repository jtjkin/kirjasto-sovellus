import React, { useEffect } from 'react'

//components
import Announcement from '../components/Annoucement'
import BookInfo from '../components/bookComponents/BookInfo'
import Logout from '../components/smallComponents/Logout'


const FrontPage = ({setUser}) => {

    useEffect(() => {
        //TODO 
        // hae käyttäjän tiedot serveriltä
        //hae kirjalista serveriltä
    }, [])

    //TODO
    //latausikoni siksi aikaa kun haetaan tietoja

    return (
        <div>
            <Announcement />

            <BookInfo title="Hyllyyn saapuneet varaukset" id="arrived"/>
            <BookInfo title="Varaukset" id="reservations"/>
            <BookInfo title="Palautuspyynnöt" id="returns"/>

            <Logout setUser={setUser}/>
        </div>
    )
}

export default FrontPage