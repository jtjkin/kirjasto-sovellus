import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import AppTitle from '../components/AppTitle'
import Button from '../components/smallComponents/Button'
import { BorderedTextInput, BorderedPasswordInput, BorderedRoleInput } from '../components/smallComponents/BorderedInputs'
import useValidator from '../services/formValidators'
import { roles } from '../constants'
import loadingIcon from '../images/loading.png'
import userService from '../services/userService'
import { initServiceTokens } from '../utils/utils'

import { updateUser } from '../reducers/userReducer'
import { getBulletins } from '../reducers/infoReducer'
import { initToken } from '../reducers/tokenReducer'

const NewUser = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [role, setRole] = useState('perusopiskelija')
    const [joinCode, setJoinCode] = useState('')
    const [page, setPage] = useState(0)
    const [validating, setValidating] = useState(false)
    
    const dispatch = useDispatch()
    const validator = useValidator()

    const submit = async (event) => {
        event.preventDefault()

        const validateRegistration = 
            validator.validateRegistration({
                email,
                setEmail,
                name,
                joinCode,
                newPassword,
                setNewPassword,
                confirmPassword,
                setConfirmPassword,
                setPage
            }) 

        if (validateRegistration === true) {
            setValidating(true)

            const newUser = {
                email,
                name,
                joinCode,
                password: newPassword,
                role
            }

            try {
                const response = await userService.addNewUser(newUser)

                initServiceTokens(response.token)
                dispatch(updateUser(response))
                dispatch(initToken(response.token))
                dispatch(getBulletins())

                const storageDetails = {
                    token: response.token,
                    id: response.id
                }
    
                window.localStorage.setItem(
                    'loggedUser', JSON.stringify(storageDetails)
                )
                props.setNewUser(false)
            } catch (error) {
                alert('Virhe lisättäessä uutta käyttäjää: ', error)
            } 
            
        }
    }

    const handleRoleChange = (event) => {
        setRole(event.target.value)
    }

    const returnLoginPage = () => {
        props.setNewUser(false)
    }

    const nextPage = () => {
        setPage(page + 1)
    }

    const returnPreviousPage = () => {
        setPage(page - 1)
    }

    if(validating === true) {
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
            <div id='background-hand'>
                <AppTitle />
                <div className='additional-space' />
    
                <form className='flexbox column'>
                    <BorderedTextInput 
                        label='liittymiskoodi*'
                        value={joinCode}
                        setValue={setJoinCode}
                    />
    
                    <BorderedTextInput 
                        label='etu- ja sukunimi'
                        value={name}
                        setValue={setName}
                    />
    
                    <BorderedTextInput 
                        label='sähköpostiosoite'
                        value={email}
                        setValue={setEmail}
                    />
                </form>

                <div className='additional-space' />

                <div className='flexbox column'> 
                    <Button id='simple' onClick={nextPage} label='Jatka'/>
                    <Button id='simple' onClick={returnLoginPage} label='Takaisin'/>
                    <div className='align-self get-code'>*Saat liittymiskoodin henkilökunnalta</div>
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
                    label='salasana'
                    value={newPassword}
                    setValue={setNewPassword}
                />

                <BorderedPasswordInput 
                    label='salasana uudelleen'
                    value={confirmPassword}
                    setValue={setConfirmPassword}
                />

                <BorderedRoleInput 
                    label='status:'
                    roles={roles}
                    role={role}
                    handleRoleChange={handleRoleChange}/>

                <div className='additional-space' />
                <Button 
                    type='submit'
                    id='simple'
                    label='Rekisteröidy'
                />
            </form>

            <div className='flexbox column'> 
                <Button id='simple' onClick={returnPreviousPage} label='Takaisin'/>
            </div>
        </div>
    )
}

export default NewUser