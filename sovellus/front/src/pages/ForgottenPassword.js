import React, { useState } from 'react'

import { BorderedTextInput } from '../components/smallComponents/BorderedInputs'
import Button from '../components/smallComponents/Button'

import userService from '../services/userService'

const ForgottenPassword = (props) => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState(null)

    const resetPassword = async () => {
        const response = await userService.resetPassword(email)
        
        setMessage(response)
        setTimeout(() => {
            setEmail('')
            setMessage(null)
            props.setForgottenPassword(false)
        }, 3000)
    }

    return (
        <div className='flexbox column forgotten-password' id='background-hand'>
            <div className='double-space'/>
            <h4 className='align-self'>Salasanan vaihto</h4>
            <div className='align-self'>{message}</div>
            
            <div className='additional-space' />
            <BorderedTextInput
                    label='sähköpostiosoite'
                    value={email}
                    setValue={setEmail}
            />

            <Button label='Lähetä' onClick={resetPassword}/>
            <Button label='Takaisin' onClick={() => props.setForgottenPassword(false)}/>
        </div>
    )
}

export default ForgottenPassword