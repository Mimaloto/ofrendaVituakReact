import React from 'react'
import { useUserStore } from '../store/userStore'
import { useNavigate } from 'react-router-dom'

export default function Dashboard(){
  const user = useUserStore(state => state.user)
  const clearUser = useUserStore(state => state.clearUser)
  const nav = useNavigate()

  const logout = () => {
    clearUser()
    localStorage.removeItem('ov_token')
    localStorage.removeItem('ov_user')
    nav('/login')
  }

  return (
    <div className="card">
      <h2>Panel de usuario</h2>
      <p>Bienvenido, <strong>{user?.nombre}</strong></p>
      <div className="actions">
        <button className="btn" onClick={() => nav('/donar')}>Realizar donación</button>
        <button className="btn-outline" onClick={() => nav('/notificaciones')}>Notificaciones</button>
      </div>
      <hr />
      <button className="btn-danger" onClick={logout}>Cerrar sesión</button>
    </div>
  )
}
