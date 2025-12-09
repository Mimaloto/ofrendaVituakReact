import axios from 'axios'

// Si tienes backend, reemplaza baseURL
const api = axios.create({
  baseURL: 'https://api.example.com', // cambiar por tu endpoint
  timeout: 8000
})

// Mock local (dev) - simula registro y login con localStorage
export async function registerUser(payload){
  // payload = { nombre, correo, contrasena }
  // Validación demo: si correo existe -> error
  const users = JSON.parse(localStorage.getItem('ov_users') || '[]')
  if(users.some(u => u.correo === payload.correo)){
    const err = new Error('El correo ya está registrado')
    err.code = 'EMAIL_EXISTS'
    throw err
  }
  const newUser = { id: Date.now(), ...payload, rol: 'FELIGRES' }
  users.push(newUser)
  localStorage.setItem('ov_users', JSON.stringify(users))
  // Retornar objeto como respuesta API
  return { data: { user: newUser, token: 'mock-token-'+newUser.id } }
}

export async function loginUser({ correo, contrasena }){
  const users = JSON.parse(localStorage.getItem('ov_users') || '[]')
  const user = users.find(u => u.correo === correo && u.contrasena === contrasena)
  if(!user){
    const err = new Error('Credenciales inválidas')
    err.code = 'INVALID_CREDENTIALS'
    throw err
  }
  // Retornar token simulado
  return { data: { user: { id: user.id, nombre: user.nombre, correo: user.correo, rol: user.rol }, token: 'mock-token-'+user.id } }
}

// Si usarás un backend real, exporta api y usa api.post('/auth/register', payload)
export default api
