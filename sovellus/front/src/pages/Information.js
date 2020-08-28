import React from 'react'
import { Link } from 'react-router-dom'

import AppTitle from '../components/AppTitle'
import Button from '../components/smallComponents/Button'
import { appName, admin } from '../constants'

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

                <div>
                    Kehitysehdotukset ja löydetyt bugit kannattaa lähettää sähköpostitse: jtjkin@utu.fi.
                </div>

                <div className='additional-space' />
                
                <h4>Tietosuojaseloste</h4>

                <div className='register-info'>
                <div>Käsikirjasto-sovellus on {app} oppiaineen käsikirjaston lainauksen ja kokoelmanhallinnan työkalu, jonka tarkoitus on korvata ne punaiset lärpäkkeet kirjojen välissä, joita kukaan ei edes enää käytä.</div>

                <div>Sovellus kerää ja tallentaa käyttäjältä saamansa seuraavat tiedot:
                    <ul>
                        <li>Nimi</li>
                        <li>Sähköpostiosoite</li>
                        <li>Rooli organisaatiossa</li>
                        <li>Salasana</li>
                    </ul>

                    Salasanaa säilytetään tietokannassa kryptattuna kolmannen osapuolen (AWS) palvelimella.
                    Kaikki käyttäjät voivat nähdä kirjakohtaisesti lainaajan nimen, mutta eivät sähköpostiosoitetta eivätkä roolia. Tällä annetaan mahdollisuus etsiä kirjaa oppiaineen sisäisesti. 
                </div>

                <div>Roolia kysytään, sillä henkilökunnalla ja muilla työhuonetta käyttävillä on mahdollisuus lisätä sovellukseen ilmoitus mahdollisuudesta hakea kirjoja odottamatta hyllyyn palautusta.</div>

                <div>
                    Laaja-alaisemmin käyttäjätietoja käsittelee oppiaineen vastuuhenkilö ({admin}). Voit tarkastella ja muokata tietojasi sovelluksessa tai olemalla yhteydessä henkilökunnan edustajaan.
                </div>
                <div>
                    Sovellus ei ole avoin. Sovelluksen käyttöön tarvitaan yksilöllinen avain, joka on saatavilla oppiaineen vastuuhenkilöltä. Siten nimitiedot ovat näkyvillä vain oppiaineen sisäisesti sen henkilökunnalla, tohtorikoulutettavilla, post-doc- ja muilla tutkijoilla, sekä niillä perustutkinto-opiskelijoilla joille on erikseen myönnetty käyttöoikeus.</div>
                <div>
                    Käyttämällä sovellusta hyväksyt nimitiedon jakamisen kuulumallesi suljetulle yhteisölle.
                </div>

                <div>Sovellus säilyttää tietoja kunnes käyttäjä poistaa ne.</div>

                <div>
                    Sovellus tallentaa kirjautumistiedon ensimmäisen kirjautumisen jälkeen evästeenä, vähentäen näin kirjautumisten määrää. Jos käytät sovellusta julkisella päätteellä, muista käytön lopuksi kirjautua ulos. Muita evästeitä ei käytetä. Lisäksi sovellus kerää anonyymiä käyttäjädataa (lainausmäärät yhteensä, laina-ajat yhteensä, tietokannassa olevien kirjojen määrä jne.), lähinnä oppiaineen pikkujouluissa esitettäväksi. 
                    Admin-tunnuksen omaavien toiminnasta kerätään admin-tunnusten antamis- ja poistamistapahtumat, sekä kirjojen poistaminen väärinkäytösten ehkäisemiseksi. Mitään sovelluksen tietoja ei luovuteta kolmansille osapuolille, mainoksiin taikka analytiikkaan.</div>
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