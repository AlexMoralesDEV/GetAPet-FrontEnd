import { useState } from 'react'

import api from '../../../utils/api'
import useFlashMessage from '../../../hooks/useFlashMessage'
import Input from '../../form/Input'
import Select from '../../form/Select'

import formStyle from '../../form/Form.module.css'

function RegisterPet() {
    const [pet, setPet] = useState({});
    const [token] = useState(localStorage.getItem('token') || '')
    const [preview, setPreview] = useState();
    const { setFlashMessage } = useFlashMessage()
    const colors = ['Branco', 'Preto', 'Marrom', 'Cinza', 'Caramelo']

    async function cadastrarPet(formData) {
        let msgText = 'Pet Cadastrado com Sucesso!'
        let msgType = 'success'

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
    }

    function handleChange(e) {
        setPet({ ...pet, [e.target.name]: e.target.value })
    }

    function handleImageChange(e) {
        setPreview([...e.target.files])
        setPet({ ...pet, images: [...e.target.files] })
    }

    function handleColorChange(e) {
        setPet({ ...pet, [e.target.name]: e.target.options[e.target.selectedIndex].text })
    }

    async function handleSubmit(e) {
        e.preventDefault()

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

        await cadastrarPet(formData)
        console.log(formData);
    }

    return (
        <section className={formStyle.form_container}>
            <h1>RegisterPet</h1>
            <form onSubmit={handleSubmit}>
                <Input name='name' type='text' text='Nome' placeholder='Digite o nome do pet' handleOnChange={handleChange} />
                <Input name='age' type='number' text='Idade' placeholder='Digite a idade do pet' handleOnChange={handleChange} />
                <Input name='weight' type='number' text='Peso' placeholder='Digite o peso do pet' handleOnChange={handleChange} />
                <Select name='color' type='text' options={colors} text='Cor' handleOnChange={handleColorChange} />
                <Input name='images' type='file' text='Imagens' handleOnChange={handleImageChange} multiple={true} />
                <input type='submit' value='Cadastrar Pet' />
            </form>
        </section>
    )
}

export default RegisterPet;