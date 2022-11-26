import React, { useState } from 'react';

const useForm = ({ initState, validator, callback }) => {
    const [state, setState] = useState(initState);
    const [errors, setErrors] = useState({});

    const handleStateChange = ({ name, value }) => {
        setState((prev) => {
            return { ...prev, [name]: value }
        })
    }

    const handleChange = (event) => {
        handleStateChange(event.target)
    }

    const handleBlur = (event) => {
        const { name: fieldName } = event.target;
        const error = validator(fieldName, state[fieldName]);
        setErrors((prev) => {
            return { ...prev, [fieldName]: error }
        })
    }

    return { handleStateChange, handleChange, handleBlur, errors, state };
}

export default useForm;