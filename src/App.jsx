import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import { motion } from 'framer-motion'

import logo from './assets/fondo3.png'  // <-- AQUÍ CARGAS TU LOGO

export default function App() {
  return (
    <div className="app-root">

      {/* HEADER ANIMADO */}
      <motion.header 
        className="app-header"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        
        <div className="header-content">
          <img src={logo} alt="Logo Ofrenda Virtual" className="app-logo" />

          <h1 className="titulo-app">Ofrenda Virtual</h1>
        </div>

        <nav className="nav-links">
          <Link to="/login" className="nav-btn">Ingresar</Link>
          <Link to="/register" className="nav-btn nav-btn-outline">Registrarse</Link>
        </nav>
      </motion.header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>

      {/* FOOTER */}
      <footer className="app-footer">
        <small>&copy; 2025 Ofrenda Virtual</small>
      </footer>
    </div>
  )
}


