 import { useContext } from 'react'
 import AuthContext from '../context/AuthProvider'

 const useAuth=()=>{
    return useContext(AuthContext) //usecontext extrae componentes de authcontext
 }

 export default  useAuth