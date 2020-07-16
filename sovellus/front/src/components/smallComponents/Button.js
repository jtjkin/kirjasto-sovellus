import React from 'react'

const Button = (props) => {
    if (props.type === 'submit') {
        if (props.id === 'simple') {
            return (
                <button 
                    className='button-no-border align-self' 
                    type='submit'>{props.label}
                </button>
            )
        }
        
        return (
            <button 
                className='general-button align-self' 
                type='submit'>{props.label}
            </button>
        )
    }

    if (props.id === 'simple') {
        return (
            <button
                className='button-no-border align-self' 
                onClick={props.onClick}>{props.label}
            </button>
        )
    }

    return (
        <button
            className='general-button align-self' 
            onClick={props.onClick}>{props.label}
        </button>
    )
}

export default Button