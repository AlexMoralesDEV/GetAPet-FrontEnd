import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import styles from './Pet.module.css'
import api from '../../../utils/api'
import RoundedImage from '../../layouts/RoundedImage'
import useFlashMessage from '../../../hooks/useFlashMessage';

function Pet() {
    const [pet, setPet] = useState(null)
    const [token] = useState(localStorage.getItem('token') || '')
    const { id } = useParams()
    const { setFlashMessage } = useFlashMessage()
    let msgType = 'success'
    let msgText = ''

    useEffect(() => {
        api.get(`/pets/${id}`)
            .then((response) => {
                console.log(response.data.petAtual)
                msgText = response.data.message
                return setPet(response.data.petAtual)
            })
            .catch((error) => {
                msgType = 'error'
                msgText = error.data.message
                console.log(error)
            })
    }, [])

    if (!pet) {
        return (
            <p>Página está carregado!</p>
        )
    }

    async function agendarVisita() {
        let msgText = '';
        let msgType = 'success'

        const data = await api.patch(`/pets/schedule/${pet._id}`, {}, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                console.log(response.data)
                msgText = response.data.message;
            })
            .catch((error) => {
                console.log(error)
                msgText = error.response.data.message;
                msgType = 'error'
            })

        setFlashMessage(msgText, msgType);
    }

    return (
        <section className={styles.section_flex}>
            <div className={styles.pet_item}>
                <div className={styles.header_item}>
                    <RoundedImage alt={pet.user.name} width='px75' src={`${process.env.REACT_APP_API}/images/users/${pet.user.image}`} />
                    <p>Dono: {pet.user.name}</p>
                </div>
                <h1>{pet.name}</h1>
                <div>
                    {pet.images && pet.images.map((image) => (
                        <RoundedImage alt={pet.name} src={`${process.env.REACT_APP_API}/images/pets/${image}`} />
                    ))}
                </div>
                <h1>Descrição</h1>
                <p>Peso: {pet.weight}kgs</p>
                <p>Idade: {pet.age}</p>
                <p>Cor: {pet.color}</p>

                {token ? (
                    <button onClick={() => { agendarVisita() }}>Agendar Visita</button>
                ) : <p className={styles.p_footer}>Faça login ou cadastre-se para adotar esse pet!</p>}
            </div>
        </section>
    )
}

export default Pet