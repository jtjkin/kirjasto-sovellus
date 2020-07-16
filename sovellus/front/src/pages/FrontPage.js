import React, { useState, useEffect } from 'react'

//components
import Announcement from '../components/Annoucement'
import BookInfo from '../components/bookComponents/BookInfo'


const FrontPage = () => {
    const [announcement, setAnnouncement] = useState(null)

    useEffect(() => {
        //TODO 
        //hae annoucement serveriltä
        // hae käyttäjän tiedot serveriltä
        //hae kirjalista serveriltä

        setAnnouncement('Palvelussa käyttökatko 1.1.-1.7')
    }, [])

    //TODO
    //latausikoni siksi aikaa kun haetaan tietoja

    return (
        <div>
            <Announcement announcement={announcement}/>

            <BookInfo title="Hyllyyn saapuneet varaukset" id="arrived"/>
            <BookInfo title="Varaukset" id="reservations"/>
            <BookInfo title="Palautuspyynnöt" id="returns"/>
        </div>
    )
}

export default FrontPage