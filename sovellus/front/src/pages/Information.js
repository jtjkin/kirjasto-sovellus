import React from 'react'
import { Link } from 'react-router-dom'

import Button from '../components/smallComponents/Button'
import { appName, admin } from '../constants'

import { linkStyle } from '../constants'
import '../css/hand-background.css'

const Information = () => {
    const app = appName.toLowerCase()
 
    return (
        <div className='info-page-web'>
            <div className='additional-space' />
            <div className='body'>
                <div className='register-info'>
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
                    <div>Bugeja raportoidessa kuvaa mahdollisimman tarkkaan mitä olit tekemässä, millä sivulla ja mitä nappia klikkasit, jotta bugi on mahdollista toistaa.</div>
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
                        <li>Laitteen ip-osoite</li>
                    </ul>

                    <div>Olet itse vastuussa tietojen oikeellisuudesta tunnuksen luomisen yhteydessä. Väärällä nimellä, sähköpostiosoitteella tai roolilla kirjautuneet käyttäjät voidaan poistaa palvelusta.</div>

                    Salasanaa säilytetään tietokannassa kryptattuna kolmannen osapuolen (AWS) palvelimella. Palveluntarjoajalla ei ole mahdollisuutta nähdä näitä tietoja.
                    Kaikki kirjautuneet käyttäjät voivat nähdä kirjakohtaisesti lainaajan nimen, mutta eivät sähköpostiosoitetta. Tällä annetaan mahdollisuus etsiä kirjaa oppiaineen sisäisesti. 
                </div>

                <div>
                    Roolia kysytään, sillä usein henkilökunnalta ja muilta fyysisen työpisteen omaavilta voi käydä kysymässä kirjaa lainaan ilman sovelluksen varaus-työkalua. Tämä nopeuttaa kirjan saantia ja mahdollistaa kirjaston käytön ilman jatkuvaa sovelluksen tai sähköpostin seurantaa.</div>
                <div>Sähköpostiosoite kerätään automatisoitujen palautuskehoitusten sekä varaus- ja saapumisilmoitusten lähettämiseen.</div>
                <div>
                    Laaja-alaisemmin käyttäjätietoja käsittelee oppiaineen vastuuhenkilö ({admin}) ja ongelmatilanteissa sovelluksen kehittäjä. Admin-tunnuksen omaavat voivat myös nähdä listan muista admin-tunnuksen omaavista henkilöistä. Voit tarkastella ja muokata tietojasi sovelluksessa tai olemalla yhteydessä henkilökunnan edustajaan.
                </div>
                <div>
                    Sovellus ei ole avoin. Sovelluksen käyttöön tarvitaan yksilöllinen avain, joka on saatavilla oppiaineen vastuuhenkilöltä. Siten nimitiedot ovat näkyvillä vain oppiaineen sisäisesti sen henkilökunnalla, tohtorikoulutettavilla, post-doc- ja muilla tutkijoilla, sekä niillä perustutkinto-opiskelijoilla joille on erikseen myönnetty käyttöoikeus.</div>
                <div>
                    Käyttämällä sovellusta hyväksyt nimitiedon ja roolin jakamisen kuulumallesi suljetulle yhteisölle, sekä hyväksyt oppiaineen käsikirjaston käyttämiseen liittyvät säännöt ja käytänteet.
                </div>

                <div>Sovellus säilyttää tietoja kunnes ne poistetaan.</div>

                <div>
                    Sovellus tallentaa kirjautumistiedon ensimmäisen kirjautumisen jälkeen evästeenä, vähentäen näin kirjautumisten määrää. Jos käytät sovellusta julkisella päätteellä, muista käytön lopuksi kirjautua ulos. Muita evästeitä ei käytetä. Lisäksi sovellus kerää anonyymiä käyttäjädataa (lainausmäärät yhteensä, laina-ajat yhteensä, tietokannassa olevien kirjojen määrä jne.), lähinnä oppiaineen pikkujouluissa esitettäväksi. 
                    Admin-tunnuksen omaavien toiminnasta kerätään admin-tunnusten antamis- ja poistamistapahtumat, sekä kirjojen poistaminen väärinkäytösten ehkäisemiseksi. Käytettyjen laitteiden ip-osoitteita kerätään automaattiseen väärinkäytösten ehkäisemiseen. Mitään sovelluksen tietoja ei luovuteta kolmansille osapuolille, mainoksiin taikka analytiikkaan.</div>
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