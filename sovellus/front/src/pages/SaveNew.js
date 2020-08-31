import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import ISBNSearch from '../components/smallComponents/ISBNSearch'

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
            <ISBNSearch 
                iSBNFound={ISBNFound}
                notFoundMessage={notFoundMessage}
                iSBNLoading={iSBNLoading}
                searching={searching}
                isbn={isbn}
                setISBN={setISBN}
                searchISBN={searchISBN}

            /> 

            <form onSubmit={submit} className='flexbox column center'>
                <TextInput 
                    label='Teoksen nimi'
                    value={title}
                    setValue={setTitle}
                    id='title'/>

                <TextInput 
                    label='Tekijä(t) / toimittaja(t)'
                    value={author}
                    setValue={setAuthor}
                    id='authors'/>

                <NumberInput 
                    label='Julkaisuvuosi'
                    value={publicationYear}
                    setValue={setPublicationYear}
                    id='publicationYear'/>    

                <TextInput 
                    label='Julkaisija'
                    value={publisher}
                    setValue={setPublisher}
                    id='publisher'/>

                <Button 
                    type='submit'
                    label='Tallenna'
                    id='save-new-book'/>
            </form>
        </div>
    )
}

export default SaveNew