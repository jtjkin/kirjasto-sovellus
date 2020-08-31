import React from 'react'
import loadingIcon from '../../images/loading.png'
import TextInput from './TextInput'
import Button from './Button'

const ISBNSearch = (props) => {
    if (props.ISBNFound === true) {
        return (
            <div>
            </div>
        )
    }

    if (props.ISBNFound === false) {
        return (
            <div className='flexbox column'>
                <div className='align-self text-align'>{props.notFoundMessage}</div>
                <div className='additional-space' />
            </div>
        )
    }

    if (props.iSBNLoading) {
        return (
            <div className='flexbox column'>
                <img className='align-self loading' src={loadingIcon} alt='' />
                <div className='additional-space' />
            </div>
        )
    }

    if (props.searching) {
        return (
            <div className='flexbox column'>
                <TextInput 
                    label='isbn'
                    value={props.isbn}
                    setValue={props.setISBN}/>

                <Button 
                    onClick={props.searchISBN}
                    label='Hae ISBN:llä'/>
            </div>
        )
    }

    return (
        <Button 
            onClick={props.searchISBN}
            label='Hae ISBN:llä'/>
    )
}

export default ISBNSearch