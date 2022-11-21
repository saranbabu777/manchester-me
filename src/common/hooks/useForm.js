import React, { useState } from 'react';

const useForm = ({ initState, validator, callback }) => {
    const [state, setState] = useState(initState);
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState((prev) => {
            return { ...prev, [name]: value }
        })
    }

    const handleBlur = (event) => {
        const { name: fieldName } = event.target;
        const error = validator(fieldName, state[fieldName]);
        setErrors((prev) => {
            return { ...prev, [fieldName]: error }
        })
    }

    return { handleChange, handleBlur, errors, state };
}

export default useForm;