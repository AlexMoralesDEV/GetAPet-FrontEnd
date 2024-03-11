import Input from '../../form/Input'
import style from '../../form/Form.module.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Login(){
    const [ user, setUser ] = useState({});

    function handleChange(e){
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    function handleSubmit(e){
        e.preventDefault();
        console.log(user);
    };

    return (
        <section className={style.form_container}>
            <h1>Login</h1>
            <form onSubmit={ handleSubmit }>
                <Input name='email' type='email' placeholder='Digite o seu email' text='Email' handleOnChange={ handleChange }/>
                <Input name='senha' type='senha' placeholder='Digite o seu senha' text='Senha' handleOnChange={ handleChange }/>
                <input type='submit' value='Entrar' />
            </form>
            <p>Ainda não tem uma conta? <Link to='/register'>Cadastre-se</Link></p>
        </section>
    )
}

export default Login;