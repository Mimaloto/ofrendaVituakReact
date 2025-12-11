import React, { useState } from 'react'
import Input from '../components/Input'
import { loginUser } from '../services/auth'
import { useUserStore } from '../store/userStore'
import { useNavigate } from 'react-router-dom'
import { isEmail } from '../utils/validators'


export default function Login(){
  const setUser = useUserStore(state => state.setUser)
  const [form, setForm] = useState({ correo:'', contrasena:'' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  const handleChange = e => setForm(s => ({ ...s, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if(!isEmail(form.correo)) return setError('Correo inválido')
    if(!form.contrasena) return setError('Ingrese la contraseña')

    setLoading(true)
    try{
      const res = await loginUser(form) // mock
      // guardar en store y localStorage
      setUser(res.data.user, res.data.token)
      localStorage.setItem('ov_token', res.data.token)
      localStorage.setItem('ov_user', JSON.stringify(res.data.user))
      nav('/dashboard')
    }catch(err){
      setError(err.message || 'Error al iniciar sesión')
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="card auth-card">
      <h2>Iniciar sesión</h2>
      {error && <div className="alert">{error}</div>}
      <form onSubmit={handleSubmit}>
        <Input id="correo" name="correo" label="Correo" value={form.correo} onChange={handleChange} />
        <Input id="contrasena" name="contrasena" label="Contraseña" type="password" value={form.contrasena} onChange={handleChange} />
        <button type="submit" className="btn" disabled={loading}>{loading ? 'Ingresando...' : 'Ingresar'}</button>
      </form>
    </div>
  )
}
