import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import userService from '../services/userService'
import infoService from '../services/infoService'

import Button from '../components/smallComponents/Button'

const Admin = () => {
    const userAdmin = useSelector(state => state.user.admin)
    const history = useHistory()
    const [adminPanel, setAdminPanel] = useState(null)
    const [showRemoveButton, setShowremoveButton] = useState(false)
    const [nameToRemove, setNameToRemove] = useState(null)
    const [message, setMessage] = useState(null)
    const [bulletinText, setBulletinText] = useState('')
    const [bulletinSaveButton, setBulletinSaveButton] =useState(false)

    //TODO
    //lautausikoni

    useEffect(() => {
        if (userAdmin) {
            getAdmins()
        } 
    }, [userAdmin])

    useEffect(() => {
        if (bulletinText) {
            setBulletinSaveButton(true)
            return
        }

        setBulletinSaveButton(false)
    }, [bulletinText])

    const fetchName = async (id) => {
        const user = await userService.getUserInfoById(id)
        setNameToRemove(user)
    }

    const getAdmins = async () => {
        const data = await infoService.adminPanel()
        setAdminPanel(data)
    }

    if (userAdmin === undefined) {
        return null
    }

    if (userAdmin === false) {
        history.push('/') 
        return null
    }

    const cancel = () => {
        setShowremoveButton(false)
    }

    const deleteAdmin = async () => {
        const response = await userService.removeAdminRights(nameToRemove.id)
        if (response !== 200) {
            setMessage('Jotakin meni vikaan. Yritä uudelleen.')
            setShowremoveButton(false)
            setTimeout(() => {
                setMessage(null)
            }, 3000)
            return
        }

        if (response === 200) {
            setMessage(`Käyttäjän ${nameToRemove.name} admin-oikeudet poistettu.`)
            setShowremoveButton(false)
            setNameToRemove(null)
            getAdmins()
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }  
    }

    const saveNewBulletin = async () => {
        const result = await infoService.saveBulletin(bulletinText)
        getAdmins()
        setBulletinText('')
        setBulletinSaveButton(false)
        setMessage(result)
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    const revealRemoveButton = (id) => {
        fetchName(id)
        setShowremoveButton(true)
    }

    const RemoveButton = () => {
        if (!showRemoveButton) {
            return null
        }
        return (
            <div className='flexbox column additional-space'>
                <Button onClick={cancel} color='yellow' label='peruuta'/>
                <div className='text-align'>Poista admin-oikeudet henkilöltä '{nameToRemove?.name}'?</div>
                <Button color='red additional-space' label='Vahvista' onClick={deleteAdmin}/>
            </div>
    )}

    return (
        <div>
            <div>
                {message}
            </div>

            <div className='margin'>
                <div className='flexbox column'>
                    <label htmlFor='add-bulletin'><h4>Lisää uusi tiedote:</h4></label>
                    <textarea id='add-bulletin' onChange={({target}) => setBulletinText(target.value)} value={bulletinText}/>
                    {bulletinSaveButton ? <Button color='additional-space' label='tallenna' onClick={saveNewBulletin}/> : null}
                </div>

                <h4 className='additional-space'>Voimassaolevat tiedotteet </h4>
                {adminPanel?.bulletins.map(bullet =>
                    <div key={bullet}>
                        <div className='small-space'>{bullet}</div>
                    </div>
                    )}
                
                <h4 className='additional-space'>Henkilöt, joilla admin-oikeudet:</h4>
                {adminPanel?.adminList.map(admin => 
                    <div className='flexbox general-list' key={admin.id}>
                        <div>
                            <div>{admin.name}</div>
                            <div>{admin.role}</div>
                        </div>
                        <div className='delete' onClick={() => revealRemoveButton(admin.id)}>X</div>
                    </div>
                )}
                <RemoveButton />
            </div>
        </div>
    )
}

export default Admin