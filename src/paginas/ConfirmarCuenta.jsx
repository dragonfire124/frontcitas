import React from 'react'
import { useEffect, useState} from 'react'
import { useParams,Link  } from 'react-router-dom'  //paquete para extraer info de la url
import axios  from 'axios'  //para realizar peticiones a urlss
import Alerta from '../components/Alerta'


const ConfirmarCuenta = () => {
const [cuentaConfirmada, setcuentaConfirmada] = useState(false)
const [cargando, setCargando] = useState(true)
const [alerta, setAlerta] = useState({})

const params = useParams()
const {token} = params   //Extrae el :token de la url 

const handleSubmit = async(e)=>{
  e.preventDefault()
 

    // Funcion marca correo confirmado
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/confirmar/${token}`  //Peticion al API veterinarios
       const { data } = await  axios(url)
       setcuentaConfirmada(true)
       setAlerta({msg: data.msg})
       
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }

    setCargando(false)  //Termino proceso de comprobacion
  
  }
  

  return ( 
    <>


<div><h1 className='text-indigo-600 font-black text-6xl'>Confirma tu cuenta y comienza a administrar tus <span className='text-black '>pacientes</span></h1></div>


<div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
 {!cargando && <Alerta  //Confirmado error ya muestra mensage
alerta={alerta}
/>}
<form onSubmit={handleSubmit}>
{cuentaConfirmada && (
        <Link to="/" className='block text-center my-5 text-gray-500'>iniciar Sesión</Link>

)}
        <input type="submit" value="Confirmar Correo" className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto ' />
</form>
</div>
    </>
  )
}

export default ConfirmarCuenta