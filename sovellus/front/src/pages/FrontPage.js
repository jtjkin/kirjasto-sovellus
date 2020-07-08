import React, { useState, useEffect } from 'react'

//components
import Announcement from '../components/Annoucement'
import FrontPageBookInfo from '../components/FrontPageBookInfo'


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

            <FrontPageBookInfo title="Hyllyyn saapuneet varaukset" id="arrived"/>
            <FrontPageBookInfo title="Varaukset" id="reservations"/>
            <FrontPageBookInfo title="Palautuspyynnöt" id="returns"/>
        </div>
    )
}

export default FrontPage