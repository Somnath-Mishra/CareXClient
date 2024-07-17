import React, { useId, forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    type: string;
    className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
    { label, type, className = "", ...props },
    ref
) {
    const id = useId();
    return (
        <div>
            {label && (<label htmlFor={id} className="form-label">{label}</label>)}
            <input
                type={type}
                id={id}
                ref={ref}
                {...props}
                className={`${className}`}
            />
        </div>
    )
});

export default Input;
