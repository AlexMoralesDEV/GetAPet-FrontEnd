import { Link } from 'react-router-dom'
import Logo from '../../assets/logo.png'

import styles from './Navbar.module.css'

import { useContext } from 'react'
import { Context } from '../../context/UserContext'

function Navbar() {

    const { authenticated, sair,  } = useContext(Context);

    return (
        <nav className={styles.navbar} >
            <div className={styles.navbar_logo}>
                <img src={Logo} alt='Get a Pet' />
                <h2>Get A Pet</h2>
            </div>
            <ul>
                <li>
                    <Link to='/'> Adotar </Link>
                </li>

                {authenticated ? (
                    <>
                        <li><Link to='/user/profile'>Perfil</Link></li>
                        <li><Link to='/pets/mypets'>Meus Pets</Link></li>
                        <li><Link to='/pets/myadoptions'>Minhas Adoções</Link></li>
                        <li onClick={() => { sair() }}>Sair</li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to='/login'> Entrar </Link>
                        </li>
                        <li>
                            <Link to='/register'> Registrar </Link>
                        </li>
                    </>
                )}


                </ul>
        </nav>
    )
}

export default Navbar;