import React from 'react'

const FrontPageBookInfo = (props) => {
    //REMOVE
    const kirjoja = [
        {
            authors: "Testaaja et al.",
            publicationYear: 2020,
            title: "Testaamisen taitolaji"
        },
        {
            authors: "Matti ja Teppo",
            publicationYear: 2021,
            title: "Inhoamme iskelmää - paljastuskirja"
        },
        {
            authors: "Hiekkanen",
            publicationYear: 2018,
            title: "Suomen keskiajan kivikirkot"
        },
    ]


    if (props.id === "arrived") {
        //TODO
        //hae reduxista saapuneiden tiedot
        const arrived = kirjoja

        return (
            <div className='body'>
            <h4>{props.title}</h4>
            {arrived.map(book =>
                    <div> 
                    <div className='author'>{book.authors} {book.publicationYear}</div>
                    <div className='title'>{book.title}</div>
                    <div className='horizontal-line' />
                    </div>
            )}
            </div>
        )
    }

    if (props.id === "reservations") {
        //TODO
        //hae reduxista voimassaolevat varaukset
        const reservations = kirjoja

        return (
            <div className='body'>
            <h4>{props.title}</h4>
            {reservations.map(book =>
                    <div> 
                    <div className='author'>{book.authors} {book.publicationYear}</div>
                    <div className='title'>{book.title}</div>
                    <div className='horizontal-line' />
                    </div>
            )}
            </div>
        )
    }

    if (props.id === "returns") {
        //TODO
        //hae reduxista voimassaolevat varaukset
        const returns = kirjoja

        return (
            <div className='body'>
            <h4>{props.title}</h4>
            {returns.map(book =>
                    <div> 
                    <div className='author'>{book.authors} {book.publicationYear}</div>
                    <div className='title'>{book.title}</div>
                    <div className='horizontal-line' />
                    </div>
            )}
            </div>
        )
    }

    return null
}

export default FrontPageBookInfo