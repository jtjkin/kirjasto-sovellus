import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import AppTitle from '../components/AppTitle'
import Button from '../components/smallComponents/Button'
import { linkStyle } from '../constants'
import { BorderedPasswordInput, BorderedRoleInput } from '../components/smallComponents/BorderedInputs'
import useValidator from '../services/formValidators'
import { roles } from '../constants'
import userService from '../services/userService'
import loadingIcon from '../images/loading.png'

const UpdatePersonalInfo = () => {
    const currentRole = useSelector(state => state.user.role)

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [role, setRole] = useState(currentRole)
    const [page, setPage] = useState(0)

    const [sent, setSent] = useState(false)
    const [updateMessage, setUpdateMessage] = useState('')
    const [responded, setResponded] = useState(null)

    const validator = useValidator()
    const history = useHistory()

    useEffect(() => {
        setRole(currentRole)
    },[currentRole])

    const submit = async (event) => {
        event.preventDefault()

        setSent(true)

        if (role === currentRole && page !== 1) {
            const validateNewPassword = 
            validator.PasswordValidator({newPassword, confirmPassword})

            if (validateNewPassword === false) {
                setNewPassword('')
                setConfirmPassword('')
                setSent(false)
                return
            }

            try {
                const response = await userService.updateUser({oldPassword, newPassword})
                setUpdateMessage(response)
            } catch (error){
                setUpdateMessage(error.response.data)
            }
            setSent(false)
            setResponded(true)    
        } else {
            if (role === currentRole) {
                alert('Roolia ei voi muuttaa tämänhetkiseen.')
                setSent(false)
                return
            }

            try {
                const response = await userService.updateUser({newRole: role})
                setUpdateMessage(response)
            } catch (error){
                setUpdateMessage(error.response.data)
            }
            setSent(false)
            setResponded(true)
        }

        setTimeout(() => {
            history.push('/omat-tiedot')
        }, 5000) 
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

    if (responded === true) {
        return (
            <div id='background-hand' className='flexbox column'>
                <AppTitle />
                <div className='double-space' />
                    <div className='align-self input-header-slim'>{updateMessage}</div>
                <Link to='/omat-tiedot' className='attach-bottom' style={linkStyle}> 
                    <Button id='simple' className='align-self' label='Takaisin'/>
                </Link>
            </div>  
        )
    } 
    if (sent === true) {
        return (
            <div id='background-hand'>
                <AppTitle />
                <div className='double-space' />
                <div className='flexbox column'>
                    <img className='align-self loading' src={loadingIcon} alt='' />
                </div>
            </div>  
        )
    }

    if (page === 0) {
        return (
            <div className='flexbox column' id='background-hand'>
                <AppTitle />
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
                <AppTitle />

                <div className='double-space' />

                <form onSubmit={submit} className='flexbox column'>
                    <BorderedRoleInput 
                        label='vaihda rooli:'
                        roles={roles}
                        role={role}
                        handleRoleChange={handleRoleChange}/>

                    <Button 
                        type='submit'
                        id='simple'
                        label='Päivitä rooli'
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
                    label='Päivitä salasana'
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