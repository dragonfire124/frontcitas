import axios from 'axios'
import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import Alerta from '../components/Alerta'

const OlvidePassword = () => {
  const [email, setEmail] = useState('')
  const [alerta, setAlerta] = useState({})


const handleSubmit = async(e)=>{ //Async porque hace llamado a la api, e porque son los datos que se envian
  e.preventDefault()

    if (email== '' || email.length<6){  //Si email vacio o menor a 6 caracters mensaje alerta
      setAlerta({
       msg: 'El email es obligatorio',
       error: 'true',
      })
    }
        
    try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/olvide-password`
        const {data} = await axios.post(url, {email})
        setAlerta({msg: data.msg})
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
}  


 

  const {msg}= alerta  //Se extrae mensaje alerta si lo hay 
  return (
    <>
    <div><h1 className='text-indigo-600 font-black text-6xl'>Recupera tus acceso y no pierdas tus <span className='text-black '>pacientes</span></h1></div>
    
    <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

    {msg && <Alerta    //Si hay mensaje de alerta se muestra mensaje, sino no se muestra nada
    alerta ={alerta}
    />}

    <form onSubmit ={handleSubmit}>
        <div className='my-5'>
          <label className=' uppercase text-gray-600 block text-xl font-bold'> Email</label>
          <input type="email" 
          placeholder='Email de registro' 
          className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' 
          value = {email}
          onChange = {e => setEmail(e.target.value)}
          />
        </div>
        <input type="submit" value="Enviar correo" className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto ' />

    </form>

    
    <nav className='mt-5 lg:flex  lg:justify-between'>
      <Link to="/" className='block text-center my-5 text-gray-500'>¿Ya tienes cuenta? Inicia sesión</Link>
      <Link to="/registrar" className='block text-center my-5 text-gray-500'>¿No tienes cuenta? Registrate</Link>
    </nav>
    </div>
    </>
    )
}

export default OlvidePassword