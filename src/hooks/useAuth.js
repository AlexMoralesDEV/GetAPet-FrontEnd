import api from '../utils/api';

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useFlashMessage from './useFlashMessage'

export default function useAuth() {

    let navigate = useNavigate();
    const [authenticated, setAuthenticated] = useState(false);
    const { setFlashMessage } = useFlashMessage();

    useEffect(() => {

        const token = localStorage.getItem('token');
        if(token){
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }

    }, [])

    async function register(user) {


        let msgText = 'O usuário foi cadastrado com sucesso!'
        let msgType = 'success'

        try {
            const data = await api.post('/users/registrar', user)
                .then(response => {
                    return response.data;
                })

            await authUser(data);
        } catch (error) {
            console.log(error)
            msgText = error.response.data.message
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType)
    }

    async function authUser(data) {
        setAuthenticated(true);
        localStorage.setItem('token', JSON.stringify(data.token));
        navigate('/home');
    }

    return { authenticated, register }

}