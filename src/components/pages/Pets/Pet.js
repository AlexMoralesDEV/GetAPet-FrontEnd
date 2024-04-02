import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import styles from './Pet.module.css'
import api from '../../../utils/api'
import RoundedImage from '../../layouts/RoundedImage'

function Pet() {
    const [pet, setPet] = useState(null)
    const { id } = useParams();
    let msgType = 'success'
    let msgText = '';

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

    if(!pet){
        return (
            <p>Página está carregado!</p>
        )
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
               
               <Link to={`/pets/schedule/${pet._id}`}>Agendar Visita</Link>
            </div>
        </section>
    )
}

export default Pet