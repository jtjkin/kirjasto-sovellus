import React, { useState, useEffect } from 'react'

//components
import Menu from '../components/Menu'
import Announcement from '../components/Annoucement'
import FrontPageBookInfo from '../components/FrontPageBookInfo'
import AppTitle from '../components/AppTitle'
import SearchBar from '../components/SearchBar'

import '../css/no-hand-background.css'


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
            <AppTitle />
            <SearchBar />
            <Menu />
            <Announcement announcement={announcement}/>

            <FrontPageBookInfo title="Hyllyyn saapuneet varaukset" id="arrived"/>
            <FrontPageBookInfo title="Varaukset" id="reservations"/>
            <FrontPageBookInfo title="Palautuspyynnöt" id="returns"/>
        </div>
    )
}

export default FrontPage