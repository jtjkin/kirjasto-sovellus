import React, { useState } from 'react'

import AppTitle from '../components/AppTitle'
import Button from '../components/smallComponents/Button'
import { BorderedTextInput, BorderedPasswordInput } from '../components/smallComponents/BorderedInputs'

const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submit = (event) => {
        event.preventDefault()
    }

    const setForgottenPassword = () => {
        props.setForgottenPassword(true)
    }

    const setNewUser = () => {
        props.setNewUser(true)
    }

    return (
        <div id='background-hand'>
            <AppTitle />
            <div className='double-space' />

            <form onSubmit={submit} className='flexbox column'>
                <BorderedTextInput
                    label='sähköpostiosoite'
                    value={username}
                    setValue={setUsername}
                />

                <BorderedPasswordInput 
                    label='salasana'
                    value={password}
                    setValue={setPassword}
                    forgottenPassword='true'
                />
                <div className='align-self forgotten-password' onClick={setForgottenPassword}>Salasana unohtunut?</div>

                <div className='additional-space' />
                <Button 
                    type='submit'
                    id='simple'
                    label='Kirjaudu'
                />
            </form>

            <div className='flexbox column'>
                <div className='align-self create-account' onClick={setNewUser}>Ei tiliä? Luo tili</div>
            </div>
        </div>
    )
}

export default Login