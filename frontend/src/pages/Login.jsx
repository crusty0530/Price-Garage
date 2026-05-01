import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { login as loginApi } from '../services/api'

export default function Login(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await loginApi({ username, password })
            login(response.data.token)
            navigate('/garage')
        } catch (err) {
            setError('Invalid username or password')
        }
    }

    return(
        <div className='min-h-screen flex items-center justify-center'>
            <div className='bg-gray-900 p-8 rounded-xl border border-gray-800 w-full max-w-md'>
                <h2 className='text-2xl font-bold mb-6'>Login</h2>
                {error && <p style={{ color: 'red'}}> {error} </p>}
                <form  onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <div>
                        <label>Username</label>
                        <input 
                            type="text" 
                            value={username} 
                            onChange={ (e) => setUsername(e.target.value)}
                            className='bg-gray-800 text-white px-4 py-2 rounded-lg w-full border border-gray-700 focus:outline-none focus:border-blue-500' 
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={ (e) => setPassword(e.target.value)}
                            className='bg-gray-800 text-white px-4 py-2 rounded-lg w-full border border-gray-700 focus:outline-none focus:border-blue-500' 
                        />
                    </div>
                    <button type='submit' className='bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors w-full'>Login</button>
                </form>
                <div className='flex justify-between mt-2'>
                    <p className='text-sm text-gray-400'>Don't have an account? <a href="/register" className='text-blue-400'>Register</a></p>
                    <p className='text-right text-sm text-gray-400'>
                        <a href="/forgot-password" className='text-blue-400'>Forgot password?</a>
                    </p>
                </div>
            </div>
        </div>
    )
}