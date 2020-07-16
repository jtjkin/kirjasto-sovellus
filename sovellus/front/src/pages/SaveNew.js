import React, { useState } from 'react'
import TextInput from '../components/smallComponents/TextInput'
import NumberInput from '../components/smallComponents/NumberInput'
import Button from '../components/smallComponents/Button'

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
        event.preventDefault()
        //TODO
        //Tee isbn-haku
        //-> latausikoni pyörimään
        //-> vastaus: löytyi: täydennä kentät, ei löytynyt -> button ei löytynyt -tekstiksi
    }

    return (
        <div className='flexbox column'>
            <Button 
                onClick={searchISBN}
                label='Hae ISBN:llä'/>

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