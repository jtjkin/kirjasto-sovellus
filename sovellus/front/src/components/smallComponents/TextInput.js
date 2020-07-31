import React from 'react'

const TextInput = (props) => (
    <div className='flexbox column center'>
        <label 
            className='align-self input-header' 
            htmlFor={props.label}>{props.label}
        </label>

        <input className='minimalistic-input'
            id={props.id}
            value={props.value}
            name={props.label}
            type='text'
            onChange={({target}) => props.setValue(target.value)}
        />
    </div>
)

export  default TextInput