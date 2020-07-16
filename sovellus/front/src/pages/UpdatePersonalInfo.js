import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import AppTitle from '../components/AppTitle'
import Button from '../components/smallComponents/Button'
import { linkStyle } from '../constants'
import { BorderedPasswordInput, BorderedRoleInput } from '../components/smallComponents/BorderedInputs'
import validator from '../services/formValidators'

const UpdatePersonalInfo = () => {
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [role, setRole] = useState('perusopiskelija')
    //TODO hae roolin default reduxista

    const roles = [
        'perusopiskelija',
        'tohtorikoulutettava',
        'henkilökuntaa'
    ]

    const submit = (event) => {
        event.preventDefault()

        const validateNewPassword = 
            validator.PasswordValidator({
                newPassword: newPassword,
                confirmPassword: confirmPassword
            })

        if (validateNewPassword === false) {
            setNewPassword('')
            setConfirmPassword('')
            return
        }

        const currentRole = 'perusopiskelija'
        //TODO hae nykyinen rooli reduxista

        if (role === currentRole) {
            //TODO
            //päivitä tiedot serverille ilman roolin muutosta
            
        } else {
            //TODO
            //lähetä tiedot serverille uuden roolin kera

            //additional layer to prevent accidental role changes
        }

        //TODO
        //loaderi siksi aikaa kun päivittää tietoja, jonka jälkeen info
        // -> React Suspense?

    }

    const handleRoleChange = (event) => {
        setRole(event.target.value)
    }

    //TODO
    //Takaisin-buttonin containerin Link-elementti laidasta laitaan, ts. ottaa
    //napin ulkopuolelta

    return (
        <div id='background-hand'>
            <AppTitle />
            <div className='additional-space' />

            <form onSubmit={submit} className='flexbox column'>
                <BorderedPasswordInput 
                    label='uusi salasana'
                    value={newPassword}
                    setValue={setNewPassword}
                />

                <BorderedPasswordInput 
                    label='salasana uudelleen'
                    value={confirmPassword}
                    setValue={setConfirmPassword}
                />

                <BorderedRoleInput 
                    label='vaihda rooli:'
                    roles={roles}
                    role={role}
                    handleRoleChange={handleRoleChange}/>

                <div className='double-space' />
                <Button 
                    type='submit'
                    id='simple'
                    label='Päivitä tiedot'
                />
            </form>

            <Link to='/omat-tiedot' className='flexbox column' style={linkStyle}> 
                <Button id='simple' label='Takaisin'/>
            </Link>
        </div>
    )
}

export default UpdatePersonalInfo