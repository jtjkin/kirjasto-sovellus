import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import { Link, useHistory } from 'react-router-dom'

import '../css/menu.css'

import { linkStyle } from '../constants'

const Menu = () => {
    const [location, setLocation] = useState('frontpage')
    const history = useHistory()

    //jQuery
    useEffect(() => {
    
        $('.hover').hover(function() {
            $(this).find('div.menubar').animate(
            {
                height: '+=10px',
                paddingTop: '+=1px'
            }, 200)
        }, function() {
            $(this).find('div.menubar').animate(
                {
                height: '-=10px',
                paddingTop: '-=1px'
                }, 200)      
        }) 

    }, []) //eslint-disable-line


    useEffect(() => {
    const idList = [
        'frontpage',
        'save-new',
        'search',
        'info'
    ]

    $(`#${location} a`).css({color: 'rgb(121, 212, 168)'})

    idList.forEach(id => {
        if(id !== location) {
        $(`#${id} a`).css({color: 'rgb(250, 250, 250)'})
        }
    })
    }, [location])


    history.listen((location) => {
        if (location.pathname === '/') {
          setLocation('frontpage')
        }
        if(location.pathname === '/lisaa-uusi') {
          setLocation('save-new')
        }
        if(location.pathname === '/hakutulokset') {
          setLocation('search')
        }
        if (location.pathname === '/omat-tiedot') {
          setLocation('info')
        }
      })


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