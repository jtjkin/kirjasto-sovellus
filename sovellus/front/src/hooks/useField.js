import { useState } from 'react'

export const useField = (name) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        if (event === '*RESET*') {
            setValue('')
        } else {
            setValue(event.target.value)
        }
    }

    return {
        name,
        value,
        onChange
    }
}