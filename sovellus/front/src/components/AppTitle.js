import React from 'react'
import { Link } from 'react-router-dom'

import { appName } from '../constants'
import { linkStyle } from '../constants'

import '../css/app-title.css'

const AppTitle = () => (
    <Link to='tietoja-sovelluksesta' style={linkStyle}>
        <div className='app'>
            <div className='app-identifyer-styling'>{appName}</div>
            <div className='app-title-styling'>käsikirjasto</div>
            <div id='bar'></div>
        </div>
    </Link>
)

export default AppTitle