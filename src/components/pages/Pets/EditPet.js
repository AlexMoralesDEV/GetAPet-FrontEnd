import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import api from '../../../utils/api'
import useFlashMessage from '../../../hooks/useFlashMessage'

import formStyle from '../../form/Form.module.css'
import FormPet from '../../form/FormPet'

function EditPet() {

    const [pet, setPet] = useState('');
    const [token] = useState(localStorage.getItem('token') || '')
    const { id } = useParams()
    const { setFlashMessage } = useFlashMessage()

    useEffect(() => {
        api.get(`/pets/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setPet(response.data.petAtual);
        }).catch((err) => {
            console.log('Erro ao buscar pets');
        })
    }, [token, id])


    async function editPet(pet) {
        let msgType = 'success'

        let formData = new FormData();

        await Object.keys(pet).forEach((key) => {
            if (key === 'images') {
                for (let i = 0; i < pet[key].length; i++) {
                    formData.append('images', pet[key])
                }
            } else {
                formData.append(key, pet[key])
            }

        })

        const data = await api.patch(`/pets/${pet._id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            return response.data
        }).catch((error) => {
            msgType = 'error'
            return error.response.data
        })

        setFlashMessage(data.message, msgType);
    }

    return (
        <section className={formStyle.form_container}>
            <h1>Editar Pet</h1>
            <p>Pet: {pet.name}</p>
            {pet.name && (<FormPet handleOnSubmit={editPet} petData={pet} btnText='Atualizar' />)}
        </section>
    )
}

export default EditPet