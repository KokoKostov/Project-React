import { useState } from "react";

export const FormSub = (initValue,onSubmitHandler)=>{
    const [value, setValue] = useState(initValue);
    const changeHandler = (e)=>{
        setValue(state => ({...state, [e.target.name]: e.target.value}));
       
    }
    const onSubmit=(e)=>{
        e.preventDefault()
        console.log(e.target);

        onSubmitHandler(value)
    }
    const changeValues = (newValues) => {
        // TODO: Validate newValues shape (like initialValues)
        
        setValue(newValues);
    };

    return ({value,
        changeHandler,
        onSubmit,
        changeValues})
}