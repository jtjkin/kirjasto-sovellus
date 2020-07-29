import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import TextInput from '../components/smallComponents/TextInput'
import NumberInput from '../components/smallComponents/NumberInput'
import Button from '../components/smallComponents/Button'
import loadingIcon from '../images/loading.png'

import booksService from '../services/booksService'
import { addBook } from '../reducers/singleBookReducer'

const SaveNew = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [ISBNauthors, setISBNauthors] = useState('')
    const [authorsShort, setAuthorsShort] = useState('')
    const [publicationYear, setPublicationYear] = useState('')
    const [publisher, setPublisher] = useState('')
    const [isbn, setISBN] = useState('')
    const [searching, setSearching] = useState(false)
    const [iSBNLoading, setISBNLoading] = useState(false)
    const [ISBNFound, setISBNFound] = useState(null)
    const [notFoundMessage, setNotFoundMessage] = useState(null)

    const [adding, setAdding] = useState(false)
    const [addedMessage, setAddedMessage] = useState('')

    const history = useHistory()
    const dispatch = useDispatch()

    const submit = async (event) => {
        event.preventDefault()

        if (!(title && author && publicationYear && publisher)) {
            alert('Kaikki tiedot on täytettävä!')
            return
        }

        setAdding(true)

        //TODO
        //lehtien tallentaminen
        //vuosilukuun 2/2020 -> poista numero? (rikkoo backin vuosilukutarkistuksen)
        // -> inputti ehdollinen: 'numero (jos lehti)'

        let dataToSend = {
            title,
            author,
            publicationYear,
            publisher
        }

        if (ISBNauthors === author) {
            dataToSend.authorsShort = authorsShort
        }

        try {
            const response = await booksService.addNewBook(dataToSend)

            dispatch(addBook(response))
            setAddedMessage('Kirja lisätty onnistuneesti!')
            setTimeout(() => {
                history.push(`/${response.id}`)
            }, 2000) 
        } catch (error) {
            alert('Jotakin meni pieleen: ', error.response.data)
        }
        
    }

    const searchISBN = async () => {

        if (searching && !isbn) {
            setSearching(false)
            return
        }

        if (searching) {
            setISBNLoading(true)
            try {
                const response = await booksService.searchISBN(isbn)
                console.log(response)

                setTitle(response.title)
                setAuthorsShort(response.AuthorsShort)
                setAuthor(response.authors)
                setISBNauthors(response.authors)
                setPublicationYear(response.publicationYear)
                setPublisher(response.publisher)
                setISBNFound(true)
            } catch (error) {
                setISBNFound(false)
                setNotFoundMessage(error.response.data)

                setTimeout(() => {
                    setNotFoundMessage(null)
                }, 5000)
            }
        }

        setSearching(true)
    }

    const ISBN = () => {
        if (ISBNFound === true) {
            return (
                <div>
                </div>
            )
        }
    
        if (ISBNFound === false) {
            return (
                <div className='flexbox column'>
                    <div className='align-self text-align'>{notFoundMessage}</div>
                    <div className='additional-space' />
                </div>
            )
        }
    
        if (iSBNLoading) {
            return (
                <div className='flexbox column'>
                    <img className='align-self loading' src={loadingIcon} alt='' />
                    <div className='additional-space' />
                </div>
            )
        }
    
        if (searching) {
            return (
                <div className='flexbox column'>
                    <TextInput 
                        label='isbn'
                        value={isbn}
                        setValue={setISBN}/>
    
                    <Button 
                        onClick={searchISBN}
                        label='Hae ISBN:llä'/>
                </div>
            )
        }

        return (
            <Button 
                onClick={searchISBN}
                label='Hae ISBN:llä'/>
        )
    }

    if (adding) {
        if (addedMessage) {
            return (
                <div className='flexbox column'>
                    <div className='align-self text-align'>{addedMessage}</div>
                </div>
            )
        }

        return (
            <div className='flexbox column'>
                 <img className='align-self loading' src={loadingIcon} alt='' />
            </div>
        )
    }

    return (
        <div className='flexbox column'>
            <ISBN /> 

            <form onSubmit={submit} className='flexbox column center'>
                <TextInput 
                    label='Teoksen nimi'
                    value={title}
                    setValue={setTitle}/>

                <TextInput 
                    label='Tekijä(t) / toimittaja(t)'
                    value={author}
                    setValue={setAuthor}/>

                <NumberInput 
                    label='Julkaisuvuosi'
                    value={publicationYear}
                    setValue={setPublicationYear}/>    

                <TextInput 
                    label='Julkaisija'
                    value={publisher}
                    setValue={setPublisher}/>

                <Button 
                    type='submit'
                    label='Tallenna'/>
            </form>
        </div>
    )
}

export default SaveNew