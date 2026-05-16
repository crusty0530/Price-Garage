/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react"
import { getCurrentUser } from "../services/api"  // adjust import path

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // Fetch user whenever we have a token (on mount or after login)
    useEffect(() => {
        if (token) {
            getCurrentUser()
                .then((res) => setUser(res.data))
                .catch(() => {
                    // Token invalid/expired — clear it
                    localStorage.removeItem("token")
                    setToken(null)
                    setUser(null)
                })
                .finally(() => setLoading(false))
        } else {
            setUser(null)
            setLoading(false)
        }
    }, [token])

    const login = (newToken) => {
        localStorage.setItem("token", newToken)
        setToken(newToken)
        // user gets populated by the useEffect above when token changes
    }

    const updateUser = (updatedUser) => {
        setUser(updatedUser)
    }

    const logout = () => {
        localStorage.removeItem("token")
        setToken(null)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ token, user, loading, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)