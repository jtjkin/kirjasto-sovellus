import React, { useState } from 'react'

const SaveNew = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')

    const submit = (event) => {
        event.preventDefault()
        //REMOVE
        console.log(title)

        //TODO
        //hae redux-listasta ja näytä listaa jo hakiessa
        //nappia painaessa heitä haku-sivulle, jossa tulokset

        setTitle('')
    }

    const searchISBN = (event) => {
        
    }

    return (
        <div className='flexbox column'>
            <button className='general-button align-self' 
                onClick={searchISBN()}>Hae ISBN:llä
            </button>
            <form onSubmit={submit} className='flexbox column'>
                
                <label htmlFor='title'>Teoksen nimi</label>
                <input className='minimalistic-input'
                value={title}
                name='title'
                onChange={({target}) => setTitle(target.value)} />
                
                <label htmlFor='author'>Tekijä(t)</label>
                <input className='minimalistic-input'
                value={author}
                name='author'
                onChange={({target}) => setAuthor(target.value)} />
            
            </form>
        </div>
    )
}

export default SaveNew