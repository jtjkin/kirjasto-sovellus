import React from 'react'
import { useDispatch } from 'react-redux'

import Button from './Button'
import { removeToken } from '../../reducers/tokenReducer'

const Logout = () => {
    const dispatch = useDispatch()

    const handleLogout = () => {
        window.localStorage.clear()
        dispatch(removeToken())
    }

    return (
        <div className='flexbox column'>
            <div className='additional-space'/>
            <Button id='simple' label='Kirjaudu ulos' onClick={handleLogout}/>
        </div>
    )
}

export default Logout