import { useState, useEffect } from 'react'
import api from '../../../utils/api'
import useFlashMessage from '../../../hooks/useFlashMessage'
import Input from '../../form/Input'
import formStyle from '../../form/Form.module.css'

function RegisterPet() {
    const [pet, setPet] = useState({});
    const [token] = useState(localStorage.getItem('token') || '')
    const [preview, setPreview] = useState();
    const { setFlashMessage } = useFlashMessage()

    useEffect(() => {
        api.get('/users/checkUser', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })

    }, [token]);

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

    function handleImageChange(e){
        setPreview(e.target.files[0])
        setPet({ ...pet, [e.target.name]: [...e.target.files] })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        const formData = new FormData();
        
        const petFormData = await Object.keys(pet).forEach((key) => {
            formData.append(key, pet[key])
        })

        await cadastrarPet(formData)
    }

    return (
        <section className={formStyle.form_container}>
            <h1>RegisterPet</h1>
            <form onSubmit={handleSubmit}>
                <Input name='name' type='text' text='Nome' placeholder='Digite o nome do pet' handleOnChange={handleChange} />
                <Input name='age' type='number' text='Idade' placeholder='Digite a idade do pet' handleOnChange={handleChange} />
                <Input name='weight' type='number' text='Peso' placeholder='Digite o peso do pet' handleOnChange={handleChange} />
                <Input name='color' type='text' text='Cor' placeholder='Digite a cor do pet' handleOnChange={handleChange} />
                <Input name='images' type='file' text='Imagens' handleOnChange={handleImageChange} mutiple={true} />
                <input type='submit' value='Cadastrar Pet' />
            </form>
        </section>
    )
}

export default RegisterPet;