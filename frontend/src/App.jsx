import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Garage from './pages/Garage'
import Estimate from './pages/Estimate'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import ResetPassword from './pages/ResetPassword'
import ForgotPassword from './pages/ForgotPassword'
import CarDetail from './pages/CarDetail'
import EditCar from './pages/EditCar'

function App() {
  
  return(
    <AuthProvider>
      <Router>
        <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/garage" element={
              <ProtectedRoute>
                <Garage />
              </ProtectedRoute>
            } />
            <Route path="/garage/:id" element={
              <ProtectedRoute>
                <CarDetail />
              </ProtectedRoute>
            } />
            <Route path="/estimate" element={ 
              <ProtectedRoute>
                <Estimate />
              </ProtectedRoute>
            } />
            <Route path="/garage/:id/edit" element={ 
              <ProtectedRoute>
                <EditCar />
              </ProtectedRoute>
            } />
            <Route path="/reset-password" element={<ResetPassword />}/>
            <Route path="forgot-password" element={<ForgotPassword />}/>
            <Route path="/" element={<Navigate to="/garage" />} />
          </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
