import React from 'react'

//TODO
//text inputti kirjatumissivulle

export const BorderedTextInput = (props) => (
    <div>
        MOI
    </div>
)

export const BorderedPasswordInput = (props) => (
    <div className='flexbox center column'>
        <label htmlFor={props.label} className='align-self input-header-slim'>
            {props.label}
        </label>
        <input className='align-self border-input password'
                value={props.value}
                name={props.label}
                type='password'
                onChange={({target}) => props.setValue(target.value)} />
    </div>        
)

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