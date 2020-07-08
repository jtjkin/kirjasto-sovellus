import React from 'react'
import { Link } from 'react-router-dom'
import '../css/menu.css'

import { linkStyle } from '../constants'

const Menu = () => {
    return (
        <ul className='flexbox center menu'>
            <li className='hover' id='frontpage'>
                <Link to='/' style={linkStyle}>
                    Etusivu
                    <div className='menubar'></div>
                </Link>
                
            </li>
            <li className='hover' id='save-new'>
                <Link to='/lisaa-uusi' style={linkStyle}>
                    Tallenna uusi kirja
                    <div className='menubar'></div>
                </Link>
                
            </li>
            <li className='hover' id='search'>
                <Link to='/hakutulokset' style={linkStyle}>
                    Haku
                    <div className='menubar'></div>
                </Link>
            </li>
            <li className='hover' id='info'>
                <Link to='/omat-tiedot' style={linkStyle}>
                    Omat tiedot
                    <div className='menubar'></div>
                </Link>
                
            </li>
        </ul>
    )
}

export default Menu