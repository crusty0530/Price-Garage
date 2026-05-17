/* eslint-disable react-hooks/set-state-in-effect */
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useDebounce } from "../hooks/useDebounce"
import { useState, useEffect, useRef } from "react"
import { searchUsers as searchUsersApi } from "../services/api"

export default function Navbar() {
    const { logout, user } = useAuth()
    const navigate = useNavigate()
    const searchRef = useRef(null)

    const [searchInput, setSearchedInput] = useState("")
    const [results, setResults] = useState([])
    const [showDropdown, setShowDropdown] = useState(false)

    const debouncedSearch = useDebounce(searchInput, 300)

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const handleResultClick = (userId) => {
        navigate(`/profile/${userId}`)
        setSearchedInput("")
        setShowDropdown(false)
    }

    useEffect(() => {
        if(debouncedSearch.trim() == ""){
            setResults([])
            setShowDropdown(false)
            return
        }

        searchUsersApi(debouncedSearch)
            .then((res) => {
                setResults(res.data)
                setShowDropdown(true)
            })
            .catch((err) => {
                console.err("Search failed", err)
                setResults([])
            })
    }, [debouncedSearch])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowDropdown(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    })

    return(
        <nav className="relative bg-gray-950 text-white flex justify-between items-center w-full px-8 py-4 border-b border-gray-800">
            <span className="text-blue-500 font-bold text-xl max-w-[30%] truncate">Price Garage</span>

            <div ref={searchRef} className="absolute left-1/2 -translate-x-1/2">
                <input type="text" 
                    placeholder="Search a User" 
                    value={searchInput} 
                    onChange={(e) => setSearchedInput(e.target.value)}
                    className="px-4 py-2 rounded-full text-black text-center bg-white w-64 max-w-[40vw]" 
                />

                {showDropdown && (
                    <div className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg overflow-hidden">
                        {results.length === 0 ? (
                            <div className="px-4 py-3 text-gray-500 text-sm">No users found</div>
                        ) : (
                            results.map((result) => (
                                <div
                                    key={result.id}
                                    onClick={() => handleResultClick(result.id)}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                                >
                                    {/* avatar */}
                                    {result.avatarUrl ? (
                                        <img className="w-8 h-8 rounded-full object-cover"
                                            src={result.avatarUrl} 
                                            alt={result.username} 
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
                                            {result.username[0].toUpperCase()}
                                        </div>
                                    )}

                                    {/* name */}
                                    <div className="text-left">
                                        <p className="text-black text-sm font-medium">{result.username}</p>
                                        {result.displayName && (
                                            <p className="text-gray-500 text-xs">{result.displayName}</p>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
            

            {user && (
                <div className="flex items-center gap-6 max-w-[30%]">
                    <Link to="/garage" className="text-gray-300 hover:text-white transition-colors">Garage</Link>
                    <Link to={`/profile/${user.id}`} className="text-gray-300 hover:text-white transition-colors">Profile</Link>
                    <button onClick={handleLogout} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer">Logout</button>
                </div>
            )}
            
        </nav>
    )
}