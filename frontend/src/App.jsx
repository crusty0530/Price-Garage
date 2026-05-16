import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/authentication/Login'
import Register from './pages/authentication/Register'
import Garage from './pages/car/Garage'
import Estimate from './pages/car/Estimate'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import ResetPassword from './pages/authentication/ResetPassword'
import ForgotPassword from './pages/authentication/ForgotPassword'
import CarDetail from './pages/car/CarDetail'
import EditCar from './pages/car/EditCar'
import Profile from './pages/profile/Profile'
import EditProfile from './pages/profile/EditProfile'

function App() {
  
  return(
    <AuthProvider>
      <Router>
        <Navbar />
          <Routes>

            {/* authentication routes */}

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />}/>
            <Route path="/forgot-password" element={<ForgotPassword />}/>

            {/* car routes */}
            
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

            {/* profile routes */}

            <Route path="/profile/:id" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/profile/edit" element={
              <ProtectedRoute>
                  <EditProfile />
              </ProtectedRoute>
            }/>
            
            <Route path="/" element={<Navigate to="/garage" />} />
          </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
