import api from '../../../utils/api'

import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Dashboard.module.css'
import useFlashMessage from '../../../hooks/useFlashMessage';

import RoundedImage from '../../layouts/RoundedImage'

function MyPets() {
    const [pets, setPets] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')

    const { setFlashMessage } = useFlashMessage();
    let navigate = useNavigate();

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

    async function removePet(id) {
        let msgType = 'success'

        const data = await api.delete(`/pets/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            let msgType = 'success';
            let updatedPets = pets.filter((pet) => { return pet._id !== id })
            setPets(updatedPets);
            return response.data
        }).catch((error) => {
            let msgType = 'error'
            return error.response.data
        })

        setFlashMessage(data.message, msgType)
    }

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
                                            <Link to={`/pets/edit/${pet._id}`}>Editar</Link>
                                            <button onClick={() => {removePet(pet._id)}}>Excluir</button>

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