

// hooks/useLocalStorage.js
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
    // Get from localStorage or use initial value
    const [value, setValue] = useState(() => {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : initialValue;
    });
    
    // Update localStorage when value changes
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    
    return [value, setValue];
}

// Usage
function Settings() {
    const [theme, setTheme] = useLocalStorage('theme', 'light');
    const [fontSize, setFontSize] = useLocalStorage('fontSize', 16);
    
    return (
        <div>
            <select 
                value={theme} 
                onChange={e => setTheme(e.target.value)}
            >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
            </select>
            
            <input 
                type="range" 
                value={fontSize}
                onChange={e => setFontSize(Number(e.target.value))}
                min="12"
                max="24"
            />
        </div>
    );
}

function useToggle(initialValue = false) {
    const [value, setValue] = useState(initialValue);
    
    const toggle = () => setValue(v => !v);
    const setTrue = () => setValue(true);
    const setFalse = () => setValue(false);
    
    return [value, { toggle, setTrue, setFalse }];
}

// Usage
function Modal() {
    const [isOpen, { toggle, setFalse }] = useToggle(false);
    
    return (
        <>
            <button onClick={toggle}>Open Modal</button>
            
            {isOpen && (
                <div className="modal">
                    <p>Modal Content</p>
                    <button onClick={setFalse}>Close</button>
                </div>
            )}
        </>
    );
}

function useForm(initialValues, validate) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prev => ({ ...prev, [name]: value }));
    };
    
    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        
        if (validate) {
            const validationErrors = validate(values);
            setErrors(validationErrors);
        }
    };
    
    const reset = () => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
    };
    
    return {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        reset,
        setValues
    };
}

// Usage
function ContactForm() {
    const validate = (values) => {
        const errors = {};
        if (!values.email.includes('@')) {
            errors.email = 'Invalid email';
        }
        return errors;
    };
    
    const { values, errors, touched, handleChange, handleBlur, reset } = 
        useForm({ name: '', email: '' }, validate);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        reset();
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            
            <input
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {touched.email && errors.email && (
                <span className="error">{errors.email}</span>
            )}
            
            <button type="submit">Submit</button>
        </form>
    );
}
