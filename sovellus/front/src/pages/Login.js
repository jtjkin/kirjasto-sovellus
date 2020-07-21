import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import AppTitle from '../components/AppTitle'
import Button from '../components/smallComponents/Button'
import { BorderedTextInput, BorderedPasswordInput } from '../components/smallComponents/BorderedInputs'
import userService from '../services/userService'
import { initToken } from '../reducers/userReducer'

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const submit = async (event) => {
        event.preventDefault()

        try {
            const loginDetails = await userService.login({email, password})

            const storageDetails = {
                token: loginDetails.token,
                id: loginDetails.id
            }

            window.localStorage.setItem(
                'loggedUser', JSON.stringify(storageDetails)
            )

            props.setUser(true)
            dispatch(initToken(loginDetails.token)) 
              //TODO
              //käyttäjän tiedot reduxiin 
        } catch {
            //TODO
            //kunnon virheilmoitus
            alert('Virhe kirjautumisessa')
        }
        
        //TODO
        //virheviesti backendistä

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
                    value={email}
                    setValue={setEmail}
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