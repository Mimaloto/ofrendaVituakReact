import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'

export default function App(){
  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Ofrenda Virtual</h1>
        <nav>
          <Link to="/login">Ingresar</Link>
          <Link to="/register">Registrarse</Link>
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas protegidas */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </main>

      <footer className="app-footer">
        <small>&copy; 2025 Ofrenda Virtual</small>
      </footer>
    </div>
  )
}

