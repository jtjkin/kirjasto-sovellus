import React from 'react'
import { Link } from 'react-router-dom'

import AppTitle from '../components/AppTitle'
import Button from '../components/smallComponents/Button'

import { linkStyle } from '../constants'
import '../css/hand-background.css'

const Information = () => {
    return (
        <div id='background-hand'>
            <AppTitle />
            <div className='additional-space' />
            <div className='body'>
                <div>
                    Palvelun on tehnyt:{' '}  
                    <a href='https://github.com/jtjkin' 
                        target='_blank'
                        rel="noopener noreferrer"
                        >Joonas Kinnunen</a>
                </div>

                <div className='additional-space' />
                
                <h4>GDPR</h4>
                <div>gdpr tähän</div>

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