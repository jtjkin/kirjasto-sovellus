import React from 'react'
import BookList from './BookList'

const FrontPageBookInfo = (props) => {
    //REMOVE
    const kirjoja = [
        {
            id: 1,
            authors: "Testaaja et al.",
            publicationYear: 2020,
            title: "Testaamisen taitolaji"
        },
        {
            id: 2,
            authors: "Matti ja Teppo",
            publicationYear: 2021,
            title: "Inhoamme iskelmää - paljastuskirja"
        },
        {
            id: 3,
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
            <BookList 
                title={props.title} 
                books={arrived}
                color='blue'/>
        )
    }

    if (props.id === "reservations") {
        //TODO
        //hae reduxista voimassaolevat varaukset
        const reservations = kirjoja

        return (
            <BookList 
                title={props.title} 
                books={reservations}
                color='yellow'/>
        )
    }

    if (props.id === "returns") {
        //TODO
        //hae reduxista voimassaolevat varaukset
        const returns = kirjoja

        return (
            <BookList 
                title={props.title} 
                books={returns}
                color='red'/>
        )
    }

    return null
}

export default FrontPageBookInfo