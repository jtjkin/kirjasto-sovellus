import React, { useState } from 'react'
import TextInput from '../components/smallComponents/TextInput'
import NumberInput from '../components/smallComponents/NumberInput'
import Button from '../components/smallComponents/Button'
import loadingIcon from '../images/loading.png'

import booksService from '../services/booksService'

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

    const submit = (event) => {
        event.preventDefault()

        if (!(title && author && publicationYear && publisher)) {
            alert('Kaikki tiedot on täytettävä!')
            return
        }

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
            const response = booksService.addNewBook(dataToSend)

            //TODO
            //onnistui -message
            //history.push(/:id)
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

    const ISBN = (props) => {
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

    return (
        <div className='flexbox column'>
            <ISBN 
                ISBNFound={ISBNFound}
                iSBNLoading={iSBNLoading}
                searching={searching}
            /> 

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