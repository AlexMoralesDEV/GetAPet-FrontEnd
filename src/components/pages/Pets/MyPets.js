import api from '../../../utils/api'

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function MyPets() {
    const [pets, setPets] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect( () => {
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
            <div>
                <h1>MyPets</h1>
                <Link to='/pets/create'>Cadastrar pet!</Link>
            </div>
            <div>
                {
                pets.length > 0 
                ? pets.map((pet, key) => (
                    <p key={`${pet.name} ${key}`}> {pet.name} </p>
                )) 
                : (<p> Não há pets cadastrados </p>)
                }
            </div>
        </section>
    )
}

export default MyPets;