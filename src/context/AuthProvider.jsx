import {useState, useEffect, createContext}  from 'react'
import axios  from 'axios'

const AuthContext = createContext()

const AuthProvider =({children})=>{
    const [auth, setAuth] = useState({})

    useEffect(()=>{
        const autenticarUsuario =async()=>{
            const token = localStorage.getItem('token')  // Extrae token de localStorage
            
            if(!token) return  //Si no hay token detiene ejecucion del programa
            //CREA HEADER DE CONGIGURACION
            const config ={
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const {data} = await axios('http://localhost:4000/api/veterinarios/perfil', config)
                setAuth(data)
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
        autenticarUsuario()
    },[])

    return(
        <AuthContext.Provider
        value ={{
            auth,
            setAuth
        }}
        >
                {children} {/* Los componentes dentro de <Authprovide/> */}
        </AuthContext.Provider>
    )

}

export {
    AuthProvider
}

export default AuthContext