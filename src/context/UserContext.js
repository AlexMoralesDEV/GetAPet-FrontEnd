import { createContext } from 'react'
import useAuth from '../hooks/useAuth'

const Context = createContext();

function UserProvider({ children }) {
    const { authenticated, register, login, sair } = useAuth();

    return <Context.Provider value={{authenticated, register, login, sair}}>
        {children}
    </Context.Provider>
}

export { Context, UserProvider }