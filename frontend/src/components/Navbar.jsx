import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Navbar() {
    const { logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return(
        <nav className="bg-gray-950 text-white flex justify-between items-center px-8 py-4 border-b border-gray-800">
            <span className="text-blue-500 font-bold text-xl">Price Garage</span>
            <div className="flex items-center gap-6">
                <a href="/garage" className="text-gray-300 hover:text-white transition-colors">My Garage</a>
                <button onClick={handleLogout} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer">Logout</button>
            </div>
        </nav>
    )
}