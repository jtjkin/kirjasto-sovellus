import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import userService from '../services/userService'
import infoService from '../services/infoService'
import { getBulletins } from '../reducers/infoReducer'

import Button from '../components/smallComponents/Button'

const Admin = () => {
    const userAdmin = useSelector(state => state.user.admin)
    const history = useHistory()
    const [adminPanel, setAdminPanel] = useState(null)
    const [showRemoveButton, setShowremoveButton] = useState(false)
    const [nameToRemove, setNameToRemove] = useState(null)
    const [message, setMessage] = useState(null)
    const [bulletinText, setBulletinText] = useState('')
    const [bulletinSaveButton, setBulletinSaveButton] = useState(false)
    
    const [joinCode, setJoinCode] = useState('')
    const [showJoinCodeButton, setShowJoinCodeButton] = useState(false)
    const [savedJoinCode, setSavedJoinCode] = useState('')

    const [nameForAdmin, setNameForAdmin] = useState('')
    const [showSearchNameButton, setShowSearchNameButton] = useState(false)
    const [showAddAdminButton, setShowAddAdminButton] = useState(false)

    const [foundPerson, setFoundPerson] = useState(null)

    //TODO
    //lautausikoni

    useEffect(() => {
        if (userAdmin) {
            getAdmins()
        } 
    }, [userAdmin])

    useEffect(() => {
        if (adminPanel) {
            setJoinCode(adminPanel.joinCode)
            setSavedJoinCode(adminPanel.joinCode)
        }
    }, [adminPanel])

    useEffect(() => {
        if (bulletinText) {
            setBulletinSaveButton(true)
            return
        }

        setBulletinSaveButton(false)
    }, [bulletinText])

    useEffect(() => {
        if (joinCode !== savedJoinCode) {
            setShowJoinCodeButton(true)
            return
        }

        setShowJoinCodeButton(false)
    }, [joinCode, savedJoinCode])

    useEffect(() => {
        if (nameForAdmin) {
            setShowSearchNameButton(true)
        }
    }, [nameForAdmin])

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
        if (adminPanel?.adminList.length === 1) {
            setMessage('Varoitus! Olet poistamassa viimeistä admin-oikeutta. Poistoa ei voida tehdä.')
            setTimeout(() => {
                setMessage(null)
            }, 3000)
            return
        }

        const response = await userService.removeAdminRights(nameToRemove.id)
        if (response !== 200) {
            setMessage('Jotakin meni vikaan. Yritä uudelleen.')
            setShowremoveButton(false)
            setTimeout(() => {
                setMessage(null)
            }, 3000)
            return
        }

        setMessage(`Käyttäjän ${nameToRemove.name} admin-oikeudet poistettu.`)
        setShowremoveButton(false)
        setNameToRemove(null)
        getAdmins()
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    const saveNewBulletin = async () => {
        const result = await infoService.saveBulletin(bulletinText)
        getAdmins()
        setBulletinText('')
        setBulletinSaveButton(false)
        getBulletins()
        setMessage(result)
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    const revealRemoveButton = (id) => {
        fetchName(id)
        setShowremoveButton(true)
    }

    const removeBulletin = async (bulletin) => {
        const response = await infoService.deleteBulletin(bulletin)

        if (response === 200) {
            setMessage('Tiedote poistettu')
            getAdmins()
            getBulletins()
            return
        }
        
        setMessage('Jotakin meni vikaan. Yritä uudestaan')
        setTimeout(() => {
            setMessage(null)
        }, 3000)
    }

    const updateJoinCode = async () => {
        const response = await infoService.updateJoinCode(joinCode)

        if (response === 200) {
            getAdmins()
            setMessage('Liittymiskoodi vaihdettu!')
            setTimeout(() => {
                setMessage(null)
            }, 3000)
            return
        }

        setMessage('Jotakin meni vikaan. Yritä uudestaan')
        setTimeout(() => {
            setMessage(null)
        }, 3000)
    }

    const addAdmin = async () => {
        const response = await userService.addAdminRights(foundPerson.id)

        if (response === 200) {
            getAdmins()
            setMessage('Admin-oikeudet lisätty!')
            setShowAddAdminButton(false)
            setNameForAdmin('')
            setTimeout(() => {
                setMessage(null)
            }, 3000)
            return
        }

        setMessage('Jotakin meni vikaan. Yritä uudestaan')
        setTimeout(() => {
            setMessage(null)
        }, 3000)
    }

    const findPerson = async () => {
        const response = await userService.findUserByName(nameForAdmin)
        setFoundPerson(response)

        if (response.exact) {
            setShowSearchNameButton(false)
            setNameForAdmin('')
        }
        setShowAddAdminButton(true)
    }

    const setSearchToExact = () => {
        const person = {
            name: foundPerson.name,
            id: foundPerson.id,
            exact: true
        }
        setShowSearchNameButton(false)
        setNameForAdmin('')
        setFoundPerson(person)
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

    const SearchPersonButton = () => {
        if (!showSearchNameButton) {
            return null
        }

        return (
            <div className='flexbox column additional-space'>
                <Button color='green' label='Etsi' onClick={findPerson}/>
            </div>
        )
    }

    const AddAdminButton = () => {
        if (!showAddAdminButton) {
            return null
        }

        if (!foundPerson.exact) {
            return (
                <div className='flexbox column additional-space'>
                <div className='text-align'>Täydellistä vastaavuutta ei löytynyt. Tarkoititko '{foundPerson.name}'?</div>
                <Button color='green additional-space' label='Kyllä' onClick={setSearchToExact}/>
            </div>
            )
        }

        return (
            <div className='flexbox column additional-space'>
                <div className='text-align'>Anna henkilölle '{foundPerson.name}' admin-oikeudet?</div>
                <Button color='green additional-space' label='Vahvista' onClick={addAdmin}/>
            </div>
        )
    }

    const SaveButtonForJoinCode = () => {
        if (!showJoinCodeButton) {
            return null
        }

        return (
            <div className='flexbox column additional-space'>
                <Button color='green' label='Päivitä koodi' onClick={updateJoinCode}/>
            </div>
        )
    }

    return (
        <div>
            <div className='flexbox column'>
                <div className='align-self'>{message}</div>
            </div>

            <div className='margin additional-space'>
                <div className='flexbox column'>
                    <label htmlFor='add-bulletin'><h4>Lisää uusi tiedote</h4></label>
                    <textarea id='add-bulletin' onChange={({target}) => setBulletinText(target.value)} value={bulletinText}/>
                    {bulletinSaveButton ? <Button color='additional-space' label='tallenna' onClick={saveNewBulletin}/> : null}
                </div>

                <h4 className='additional-space'>Voimassaolevat tiedotteet </h4>
                {adminPanel?.bulletins.map(bullet =>
                    <div key={bullet} className='small-space flexbox general-list'>
                        <div>{bullet}</div>
                        <div>
                            <div className='delete' onClick={() => removeBulletin(bullet)}>X</div>
                        </div>
                    </div>
                )}

                <h4 className='additional-space'>Liittymiskoodi</h4>
                <input className='admin-page-input' 
                    value={joinCode} onChange={({target}) => setJoinCode(target.value)}></input>
                <SaveButtonForJoinCode />

                <h4 className='additional-space'>Henkilöt, joilla admin-oikeudet</h4>
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

                <h4 className='additional-space'>Anna admin-oikeudet</h4>
                <label htmlFor='admin-page-input'>Hae henkilöä:</label>
                <input id='admin-page-input' className='admin-page-input' 
                    value={nameForAdmin} onChange={({target}) => setNameForAdmin(target.value)}></input>
                <SearchPersonButton />
                <AddAdminButton />
            </div>
            <div className='double-space' />
        </div>
    )
}

export default Admin