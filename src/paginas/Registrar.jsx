import React, {useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Alerta from '../components/Alerta'


const Registrar = () => {
const [nombre, setNombre]= useState('') //Guarda el nombre 
const [email, setEmail]= useState('') //Guarda el email
const [password, setPassword]= useState('') //Guarda el password 
const [repetirPasssword, setrepetirPassword]= useState('') //Guarda  repetirPassword   
const [alerta, setAlerta]= useState({})

const handleSubmit =async(e)=>{//
  e.preventDefault()

//Detecta si alguna de las variables esta vacia 
if([nombre, email, password, repetirPasssword].includes('')){
 setAlerta({msg: 'Hay campos vacios',  error:true})
return; //Sale de handleSubmit
}

if(password !== repetirPasssword){
  setAlerta({msg:'Los passwords no coinciden', error:true})
  return;
}

if(password.length<=6){
  setAlerta({msg:'El password es muy pequeño, incluya al menos 6 caracteres', error:true})
  return;
}



//  CREAR USUARIO API
try {
  const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios`  //Direccion url api registrar
  await axios.post(url,{nombre, email,password})  // Se envia url, y datos nuevo veterinario
  setAlerta({
    msg: 'Creado correctamente, reviza tu email',
    error: false
  })
  
} catch (error) {

  setAlerta({
    msg: error.response.data.msg,
    error:true
  })


}


}

const {msg} = alerta  // Se extrae msg de alerta. Para comprobar despues si se despliega
return (
    <>
    <div><h1 className='text-indigo-600 font-black text-6xl'>Crea tu cuenta y administra tus <span className='text-black '>pacientes</span></h1></div>
    
    <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
    
    { msg && <Alerta  // si hay algo en el msg se muestra componente Alerta
    alerta ={alerta}
    />}
    
    <form  onSubmit={handleSubmit}>
        <div className='my-5'>
          <label className=' uppercase text-gray-600 block text-xl font-bold'>Nombre</label>
          <input type="text" placeholder='Tu nombre' className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
          value ={nombre}
          onChange = {e => setNombre(e.target.value)}
          />
        </div>

        <div className='my-5'>
          <label className=' uppercase text-gray-600 block text-xl font-bold'> Email</label>
          <input type="email" placeholder='Email de registro' className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' 
                  value ={email}
                  onChange = {e => setEmail(e.target.value)}
          />
        </div>

        <div className='my-5'>
          <label className=' uppercase text-gray-600 block text-xl font-bold'>Password</label>
          <input type="password" 
                 placeholder='Tu password' 
                 className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                  value ={password}
                  onChange = {e => setPassword(e.target.value)}
          />
        </div>

        <div className='my-5'>
          <label className=' uppercase text-gray-600 block text-xl font-bold'>Repetir password</label>
          <input type="password" placeholder='Repite tu password' className='border w-full p-3 mt-3 bg-gray-50 rounded-xl' 
                  value ={repetirPasssword}
                  onChange = {e => setrepetirPassword(e.target.value)}
          />
        </div>

        <input type="submit" 
        value="Crear cuenta" 
        className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto ' 
        
        />
      </form>

      <nav className='mt-5 lg:flex  lg:justify-between'>
      <Link to="/" className='block text-center my-5 text-gray-500'>¿Ya tienes cuenta? Inicia Sesión</Link>
      <Link to="/olvide-password" className='block text-center my-5 text-gray-500'>Olvide mi password</Link>
    </nav>
    </div>
    </>
    )
}
 
export default Registrar