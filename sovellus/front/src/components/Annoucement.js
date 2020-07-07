import React from 'react'

const Annoucement = ({announcement}) => {
    if (announcement === null) {
        return null
    }

    return (
        <div className='body'>
            <h3>Tiedote</h3>
            <div>{announcement}</div>
        </div>
    )
}

export default Annoucement