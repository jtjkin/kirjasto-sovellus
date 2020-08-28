import React from 'react'
import { useSelector } from 'react-redux'

const Annoucement = () => {
    const bulletins = useSelector(state => state.info)

    if (bulletins.length === 0) {
        return null
    }

    return (
        <div className='body flexbox announcement'>
            <div>
                <h3>Tiedote</h3>
                {bulletins.map(bulletin => 
                    <div key={bulletin}
                         className='bulletin-info'>
                             {bulletin}
                    </div>
                )}
            </div>
            <div className='gray bar'>
            </div>
        </div>
    )
}

export default Annoucement