import { useState, useEffect } from 'react'
import useFlashMessage from '../../../hooks/useFlashMessage'
import api from '../../../utils/api'

import formStyles from '../../form/Form.module.css'
import styles from './Profile.module.css'

import Input from '../../form/Input'

function Profile() {
    const [user, setUser] = useState({});
    const [token] = useState(localStorage.getItem('token') || '');
    const [preview, setPreview] = useState();

    const { setFlashMessage } = useFlashMessage();

    useEffect(() => {
        api.get('/users/checkUser', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setUser(response.data);
        })

    }, [token]);

    async function atualizar(formData) {
        let msgText = 'Usuário Atualizado com Sucesso!'
        let msgType = 'success'

        try {

            const data = await api.patch(`/users/edit/${user._id}`, formData, {
                headers: {
                    Authorization: `Bearer: ${JSON.parse(token)}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    return response.data
                })

        } catch (error) {
            console.log(error.response.data.message)
            msgText = error.response.data.message
            msgType = 'error'
        }
        setFlashMessage(msgText, msgType)
    }

    function onFileChange(e) {
        setPreview(e.target.files[0])
        setUser({ ...user, [e.target.name]: e.target.files[0] })
    }

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        const formData = new FormData()
        const userFormData = await Object.keys(user).forEach((key) => {
            formData.append(key, user[key])
        })

        atualizar(formData);
    }

    return (
        <section>
            <div className={styles.profile_container}>
                <h1>Perfil</h1>
                {(user.img || preview) && (
                    <img
                        src={
                            preview
                                ? URL.createObjectURL(preview)
                                : `${process.env.REACT_APP_API}/images/users/${user.img}`
                        }
                        alt={user.name}
                    />
                )}
            </div>
            <form onSubmit={handleSubmit} className={formStyles.form_container}>
                <Input text='Imagem' type='file' name='image' handleOnChange={onFileChange} />
                <Input text='Email' type='email' name='email' placeholder='Digite o seu email' value={user.email || ''} handleOnChange={handleChange} />
                <Input text='Nome' type='text' name='name' placeholder='Digite o seu nome' value={user.name || ''} handleOnChange={handleChange} />
                <Input text='Telefone' type='text' name='phone' placeholder='Digite o seu telefone' value={user.phone || ''} handleOnChange={handleChange} />
                <Input text='Senha' type='password' name='password' placeholder='Digite a sua senha' handleOnChange={handleChange} />
                <Input text='Confirmar senha' type='password' name='confirmPassword' placeholder='Confirme a sua senha' handleOnChange={handleChange} />
                <input type='submit' value='Atualizar' />
            </form>
        </section>
    )
}

export default Profile