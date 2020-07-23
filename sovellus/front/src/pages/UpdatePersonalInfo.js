import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import AppTitle from '../components/AppTitle'
import Button from '../components/smallComponents/Button'
import { linkStyle } from '../constants'
import { BorderedPasswordInput, BorderedRoleInput } from '../components/smallComponents/BorderedInputs'
import useValidator from '../services/formValidators'
import { roles } from '../constants'
import userService from '../services/userService'

const UpdatePersonalInfo = () => {
    const currentRole = useSelector(state => state.user.role)

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [role, setRole] = useState(currentRole)
    const [page, setPage] = useState(0)

    const validator = useValidator()

    useEffect(() => {
        setRole(currentRole)
    },[currentRole])

    const submit = (event) => {
        event.preventDefault()

        const validateNewPassword = 
            validator.PasswordValidator({newPassword, confirmPassword})

        if (validateNewPassword === false) {
            setNewPassword('')
            setConfirmPassword('')
            return
        }

        if (role === currentRole) {
            try {
                const response = userService.updateUser({newPassword})
            } catch (error){
                //TODO
                //Errorin kunnollinen näyttäminen
            }
            
        } else {
            //TODO
            const response = userService.updateUser({newRole: role})
        }

        //TODO
        //loaderi siksi aikaa kun päivittää tietoja, jonka jälkeen info
        // -> React Suspense?

    }

    const handleRoleChange = (event) => {
        setRole(event.target.value)
    }

    const toRolePage = () => {
        setPage(1)
    }

    const toMainPage = () => {
        setNewPassword('')
        setConfirmPassword('')
        setRole(currentRole)
        setPage(0)
    }
    //TODO
    //inputti vanhalle salasanalle

    if (page === 0) {
        return (
            <div className='flexbox column' id='background-hand'>
                <div className='double-space' />
                <div className='additional-space' />
                <Button id='simple' label='Vaihda Salasana' onClick={() => {setPage(2)}}/>
                <Button id='simple' label='Vaihda rooli' onClick={toRolePage}/>

                <Link to='/omat-tiedot' className='attach-bottom' style={linkStyle}> 
                    <Button id='simple' label='Takaisin'/>
                </Link>
            </div>
        )
    }
    
    if (page === 1) {
        return (
            <div className='flexbox column' id='background-hand'>
                <form onSubmit={submit} className='flexbox column'>
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
                <div className='attach-bottom'>
                    <Button id='simple' label='Takaisin' onClick={toMainPage}/>
                </div>
            </div>
        )
    }

    return (
        <div id='background-hand'>
            <AppTitle />
            <div className='additional-space' />

            <form onSubmit={submit} className='flexbox column'>
                <BorderedPasswordInput 
                    label='vanha salasana'
                    value={oldPassword}
                    setValue={setOldPassword}
                />

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

                <div className='double-space' />
                <Button 
                    type='submit'
                    id='simple'
                    label='Päivitä tiedot'
                />
            </form>
            <div className='flexbox column'>
                <Button
                    id='simple' 
                    label='Takaisin' 
                    onClick={toMainPage}/>
            </div>
        </div>
    )
}

export default UpdatePersonalInfo