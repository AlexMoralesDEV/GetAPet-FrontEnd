import api from '../../../utils/api'

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './Dashboard.module.css'

import RoundedImage from '../../layouts/RoundedImage'

function MyPets() {
    const [pets, setPets] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() => {
        const allPets = api.get('/pets/mypets', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                setPets(response.data.mypets);
            })

    }, [token])


    return (
        <section>
            <div className={styles.petList_header}>
                <h1>MyPets</h1>
                <Link to='/pets/create'>Cadastrar pet!</Link>
            </div>
            <div className={styles.petList_container}>
                {
                    pets.length > 0
                        ? pets.map((pet, key) => (
                            <div className={styles.petList_row} key={pet._id}>
                                <RoundedImage src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`} alt={`Imagem do ${pet.name}`} width='px75' />
                                <span className='bold'> {pet.name} </span>
                                <span className={styles.actions}>
                                    {pet.avaiable ? (
                                        <>
                                            {pet.adopter && <button className={styles.conclude_btn}>Concluir Adoção</button>}
                                                <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                                                <button>Excluir</button>
                                            
                                        </>
                                    ) : (<p> Pet já foi adotado </p>)}
                                </span>
                            </div>
                        ))
                        : (<p> Não há pets cadastrados </p>)
                }
            </div>
        </section>
    )
}

export default MyPets;