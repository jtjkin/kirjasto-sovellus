import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import $ from 'jquery'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons'

library.add(faArrowAltCircleLeft)

const BackButton = () => {
    const history = useHistory()

    //jQuery
    useEffect(() => {
    
        $('.back-button-text').hover(function() {
            $(this).find('#back-button-icon').animate(
                {
                    marginLeft: '-=4px',
                    marginRight: '+=6px'
                }, 200)
        }, function() {
            $(this).find('#back-button-icon').animate(
                {
                    marginLeft: '+=4px',
                    marginRight: '-=6px'
                }, 200)   
    }) 

    }, []) //eslint-disable-line

    const back = () => {
        history.goBack()
    }

    return (
        <div onClick={back} className='margin-bottom back-button-text'>
            <FontAwesomeIcon 
                icon={faArrowAltCircleLeft} 
                size='2x'
                title='search'
                className='back-button'
                id='back-button-icon'/>
            Takaisin
        </div>
    )
}

export default BackButton