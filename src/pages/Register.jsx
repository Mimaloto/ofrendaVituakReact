import React, { useState } from 'react'
import Input from '../components/Input'
import { registerUser } from '../services/auth'
import { useNavigate } from 'react-router-dom'
import { isEmail, minLength } from '../utils/validators'

export default function Register(){
  const [form, setForm] = useState({ nombre:'', correo:'', contrasena:'' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const nav = useNavigate()

  const handleChange = e => setForm(s => ({ ...s, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setError(null)
    // Validaciones básicas
    if(!form.nombre.trim()) return setError('Ingrese su nombre')
    if(!isEmail(form.correo)) return setError('Correo inválido')
    if(!minLength(form.contrasena, 6)) return setError('La contraseña debe tener al menos 6 caracteres')

    setLoading(true)
    try{
      const res = await registerUser(form) // servicio mock
      // opcional: guardar token en localStorage
      localStorage.setItem('ov_token', res.data.token)
      localStorage.setItem('ov_user', JSON.stringify(res.data.user))
      nav('/login')
    }catch(err){
      setError(err.message || 'Error en el registro')
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="card auth-card">
      <h2>Registro</h2>
      {error && <div className="alert">{error}</div>}
      <form onSubmit={handleSubmit}>
        <Input id="nombre" name="nombre" label="Nombre completo" value={form.nombre} onChange={handleChange} />
        <Input id="correo" name="correo" label="Correo" value={form.correo} onChange={handleChange} />
        <Input id="contrasena" name="contrasena" label="Contraseña" value={form.contrasena} onChange={handleChange} type="password" />
        <button type="submit" className="btn" disabled={loading}>{ loading ? 'Guardando...' : 'Registrar' }</button>
      </form>
    </div>
  )
}
