import api from '../utils/api';

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useFlashMessage from './useFlashMessage'

export default function useAuth() {
    
    const { setFlashMessage } = useFlashMessage();

    async function register(user) {


        let msgText = 'O usuário foi cadastrado com sucesso!'
        let msgType = 'success'

        try {
            const data = await api.post('/users/registrar', user)
                .then(response => {
                    return response.data;
                })

            console.log(data);
        } catch (error) {
            console.log(error)
            msgText = error.response.data.message
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType)
    }

    return { register }

}