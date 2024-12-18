import { useEffect, useRef } from "react";


const InputWithLabel = ({ 
    id, 
    value, 
    type='text', 
    onChange,
    children,
    }) => {
        const inputRef = useRef();
        useEffect(() => {
            inputRef.current.focus();
        });
        return (
            <>
                <label htmlFor={id}>{children}</label>
                <input 
                    type={type} 
                    id={id} 
                    placeholder="Enter new todo..."
                    name="title"
                    ref={inputRef}
                    value={value} 
                    onChange={onChange}
                />
            </>
        )
       
    }

export default InputWithLabel;