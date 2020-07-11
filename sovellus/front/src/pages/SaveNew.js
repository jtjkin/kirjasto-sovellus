import React, { useState } from 'react'
import TextInput from '../components/smallComponents/TextInput'
import NumberInput from '../components/smallComponents/NumberInput'

const SaveNew = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [publicationYear, setPublicationYear] = useState('')
    const [publisher, setPublisher] = useState('')

    const submit = (event) => {
        event.preventDefault()

        //TODO
        //tarkista, että kaikki kentät täytetty
        //tarkista onko jo listassa

        setTitle('')
    }

    const searchISBN = (event) => {
        //TODO
        //Tee isbn-haku
        //-> latausikoni pyörimään
        //-> vastaus: löytyi: täydennä kentät, ei löytynyt -> button ei löytynyt -tekstiksi
    }

    return (
        <div className='flexbox column'>
            <button className='general-button align-self' 
                onClick={searchISBN()}>Hae ISBN:llä
            </button>
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

                <button 
                    className='general-button align-self' 
                    type='submit'>
                        Tallenna
                </button>
            </form>
        </div>
    )
}

export default SaveNew