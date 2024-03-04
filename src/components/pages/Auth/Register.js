import { useState } from 'react'

import Input from '../../form/Input'
import { Link } from 'react-router-dom'

import styles from '../../form/Form.module.css'

function Register() {
    const [user, setUser] = useState({});


    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(user);
    }

    return (
        <section className={styles.form_container}>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite o seu nome"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Email"
                    type="email"
                    name="email"
                    placeholder="Digite o seu email"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite o sua senha"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Confirmar senha"
                    type="password"
                    name="confirmPassword"
                    placeholder="Digite o sua senha"
                    handleOnChange={handleChange}
                />
                <input type="submit" value="Cadastar" />
                <p>Já possui uma conta? Faça login <Link to="/login">clicando aqui</Link></p>
            </form>
        </section>
    )
}

export default Register;