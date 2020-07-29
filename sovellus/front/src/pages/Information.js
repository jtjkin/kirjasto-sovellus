import React from 'react'
import { Link } from 'react-router-dom'

import AppTitle from '../components/AppTitle'
import Button from '../components/smallComponents/Button'
import { appName } from '../constants'

import { linkStyle } from '../constants'
import '../css/hand-background.css'

const Information = () => {
    const app = appName.toLowerCase()

    return (
        <div id='background-hand'>
            <AppTitle />
            <div className='additional-space' />
            <div className='body'>
                <div>
                    Sovelluksen on tehnyt:{' '}  
                    <a href='https://github.com/jtjkin' 
                        target='_blank'
                        rel="noopener noreferrer"
                        >Joonas Kinnunen</a>
                </div>

                <div className='additional-space' />
                
                <h4>Tietosuojaseloste</h4>

                <div className='register-info'>
                <div>Käsikirjasto-sovellus on {app} oppiaineen käsikirjaston lainauksen ja kokoelmanhallinnan työkalu.</div>

                <div>Sovellus kerää tallentaa käyttäjältä saamansa seuraavat tiedot:
                    <ul>
                        <li>Nimi</li>
                        <li>Sähköpostiosoite</li>
                        <li>Rooli organisaatiossa</li>
                        <li>Salasana</li>
                    </ul>

                    Salasanaa säilytetään tietokannassa kryptattuna.
                    Kaikki käyttäjät voivat nähdä kirjakohtaisesti lainaajan nimen, mutta eivät sähköpostiosoitetta eivätkä roolia. Tällä annetaan mahdollisuus etsiä kirjaa oppiaineen sisäisesti. 
                </div>

                <div>Sovellus ei ole avoin. Sovelluksen käyttöön tarvitaan yksilöllinen avain, joka on saatavilla oppiaineen vastuuhenkilöltä. Siten nimitiedot ovat näkyvillä vain oppiaineen sisäisesti sen henkilökunnalla, tohtorikoulutettavilla, post-doc- ja muilla tutkijoilla, sekä niillä perustutkinto-opiskelijoilla joille on myönnetty käyttöoikeus.</div>

                <div>Sovellus säilyttää tietoja kunnes käyttäjä poistaa ne.</div>

                <div>Sovellus käyttää evästeitä.</div>
                <div>JATKA gdpr tähän</div>
                </div>
                <div className='additional-space' />

                <h4>resurssit</h4>
                <div>Tämä sovellus käyttää seuraavia avoimia resursseja:</div>
                <div>
                    Taustakuva: 
                    <a href="https://unsplash.com/@thoughtcatalog?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
                        Thought Catalog</a> on{' '}  
                        <a href="https://unsplash.com/@thoughtcatalog?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
                            Unsplash
                        </a>
                </div>
                <div>
                    CSS-Reset:
                    <a href='http://meyerweb.com/eric/tools/css/reset/' 
                        target='_blank'
                        rel='noopener noreferrer'>Eric Meyer</a>
                </div>

                <div className='additional-space' />
                <Link to='/' className='flexbox column' style={linkStyle}> 
                    <Button id='simple' label='Takaisin'/>
                </Link>
            </div>
        </div>
    )
}

export default Information