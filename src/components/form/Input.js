import styles from './Input.module.css'

function Input({ type, text, name, placeholder, handleOnChange, value, mutiple }) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}</label>
            <input 
            type={type} 
            name={name} id={name} 
            value={value} 
            placeholder={placeholder} 
            onChange={handleOnChange} 
            { ...(mutiple ? {mutiple} : '')}
            />
        </div>
    )
}

export default Input