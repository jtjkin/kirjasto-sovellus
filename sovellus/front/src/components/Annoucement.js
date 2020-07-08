import React from 'react'

const Annoucement = ({announcement}) => {
    if (announcement === null) {
        return null
    }

    return (
        <div className='body flexbox announcement'>
            <div>
                <h3>Tiedote</h3>
                <div>{announcement}</div>
            </div>
            <div className='gray'>
            </div>
        </div>
    )
}

export default Annoucement