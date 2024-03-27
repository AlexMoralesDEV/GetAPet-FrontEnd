import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import api from '../../../utils/api'
import useFlashMessage from '../../../hooks/useFlashMessage'

import formStyle from '../../form/Form.module.css'
import FormPet from '../../form/FormPet'

function RegisterPet() {
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()

    async function cadastrarPet(pet) {
        let msgText = 'Pet Cadastrado com Sucesso!'
        let msgType = 'success'

        const formData = new FormData();

        for (const key in pet) {
            if (key === 'images') {
                for (let i = 0; i < pet[key].length; i++) {
                    formData.append(`images`, pet[key][i])
                }
            } else {
                formData.append(key, pet[key])
            }
        }

        try {

            const petCadastrado = await api.post('/pets/create', formData, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((reponse) => {
                    return reponse.data
                })
        } catch (error) {
            console.log(error)
            msgText = error.response.data.message
            msgType = 'error'
        }
        setFlashMessage(msgText, msgType)
        navigate('/pets/mypets')
    }

    return (
        <section className={formStyle.form_container}>
            <h1>Registrar Pet</h1>
            <FormPet handleOnSubmit={cadastrarPet} btnText='Cadastrar Pet' />
        </section>
    )
}

export default RegisterPet;