import api from '../../../utils/api'

import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Dashboard.module.css'
import useFlashMessage from '../../../hooks/useFlashMessage';

import RoundedImage from '../../layouts/RoundedImage'

function MyAdoptions() {
    const [pets, setPets] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')

    const { setFlashMessage } = useFlashMessage();
    let navigate = useNavigate();

    useEffect(() => {
        const allPets = api.get('/pets/myadoptions', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                console.log(response.data)
                setPets(response.data.myadoptions);
            }).catch((error) => {
                console.log(error)
            })

    }, [token])


    return (
        <section>
            <div className={styles.petList_header}>
                <h1>Minhas Adoções</h1>
            </div>
            <div className={styles.petList_container}>
                {
                    pets.length > 0
                        ? pets.map((pet, key) => (
                            <div className={styles.petList_row} key={pet._id}>
                                <RoundedImage src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`} alt={`Imagem do ${pet.name}`} width='px75' />
                                <span className='bold'> {pet.name} </span>
                                <div>
                                    <span className='bold'>Nome do Dono</span>
                                    <span> {pet.user.name} </span>
                                    <span className='bold'>Telefone</span>
                                    <span> {pet.user.phone} </span>
                                </div>
                                <span className={styles.actions}>
                                    {pet.avaiable ? (
                                        <p>Adoção em Processo</p>
                                    ) : (<p> Pet já foi adotado </p>)}
                                </span>
                            </div>
                        ))
                        : (<p> Não há pets adotados </p>)
                }
            </div>
        </section>
    )
}

export default MyAdoptions