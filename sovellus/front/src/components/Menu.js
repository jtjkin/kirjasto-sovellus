import React from 'react'
import { Link } from 'react-router-dom'
import '../css/menu.css'

import { linkStyle } from '../constants'

const Menu = () => {
    return (
        <ul className='flexbox center menu'>
            <li><Link to='/' style={linkStyle}>Etusivu</Link></li>
            <li><Link to='/lisaa-uusi' style={linkStyle}>Tallenna uusi kirja</Link></li>
            <li><Link to='/hakutulokset' style={linkStyle}>Haku</Link></li>
            <li><Link to='/omat-tiedot' style={linkStyle}>Omat tiedot</Link></li>
        </ul>
    )
}

export default Menu