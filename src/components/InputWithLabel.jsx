import PropTypes from "prop-types";
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

InputWithLabel.propTypes = {
    id: PropTypes.string, 
    value: PropTypes.any,
    type: PropTypes.string,
    onChange: PropTypes.func,
    children: PropTypes.any,
}

export default InputWithLabel;