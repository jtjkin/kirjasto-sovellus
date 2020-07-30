import React from 'react'
import loadingIcon from '../../images/loading.png'

const LoadingIcon = () => (
    <div className='flexbox column'>
        <img className='align-self loading' src={loadingIcon} alt='' />
        <div className='additional-space' />
    </div>
)

export default LoadingIcon