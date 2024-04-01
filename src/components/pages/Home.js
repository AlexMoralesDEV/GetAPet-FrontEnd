import { useState, useEffect } from 'react'

import api from '../../utils/api'
import RoundedImage from '../layouts/RoundedImage'

import styles from './Home.module.css'

function Home(){
    const [pets, setPets] = useState('')

    useEffect(() => {
        api.get('/pets/').then((response) => {
            console.log(response.data.allPets)
            return setPets(response.data.allPets)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    return (
        <section className={styles.section_flex}>
            {/* <h1>Pet para Adoção</h1> */}
            {pets && pets.map((pet) => (
                <div className={styles.pet_item}>
                    <RoundedImage width='px75' alt={pet.name} src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}/>
                    <h1>{pet.name}</h1>
                    <p><span>Dono: </span>{pet.user.name}</p>
                </div>
            ))}
        </section>
    )
}

export default Home;