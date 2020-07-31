import React from 'react'

//TODO
//text inputti kirjatumissivulle

export const BorderedTextInput = (props) => (
    <div className='flexbox center column'>
        <label htmlFor={props.label} className='align-self input-header-slim'>
            {props.label}
        </label>
        <input className='align-self border-input-text'
                id={props.id}
                value={props.value}
                name={props.label}
                onChange={({target}) => props.setValue(target.value)} />
    </div> 
)

export const BorderedPasswordInput = (props) => {
    const forgottenPasswordStyling = props.forgottenPassword 
        ? 'border-input-add-info' : 'border-input'

    return(
        <div className='flexbox center column'>
            <label htmlFor={props.label} className='align-self input-header-slim'>
                {props.label}
            </label>
            <input className={`align-self ${forgottenPasswordStyling} password`}
                    id={props.id}
                    value={props.value}
                    name={props.label}
                    type='password'
                    onChange={({target}) => props.setValue(target.value)} />
        </div> 
    )       
}

export const BorderedRoleInput = (props) => (
    <div className='flexbox center column'>
        <label htmlFor={props.label} className='align-self input-header-slim'>
            {props.label}
        </label>
        <select 
            value={props.role} 
            onChange={props.handleRoleChange}
            className='align-self role-input'>
                {props.roles.map(role =>
                    <option key={role} value={role}>
                        {role}
                    </option>
                )}
        </select>
    </div>
)