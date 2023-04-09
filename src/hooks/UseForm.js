import { useState } from "react";

export const useForm = (initValue,onSubmitHandler)=>{
    const [value, setValue] = useState(initValue);
    const changeHandler = (e)=>{
        setValue(state => ({...state, [e.target.name]: e.target.value}));
       

    }
    const onSubmit=(e)=>{
        e.preventDefault()
        console.log(e);
        
        onSubmitHandler(value)

        setValue(initValue)
    }
       

    
    const changeValues = (newValues) => {
      
        
        setValue(newValues);
    };
    
        return ({value,
            changeHandler,
            onSubmit,
            changeValues})

        }