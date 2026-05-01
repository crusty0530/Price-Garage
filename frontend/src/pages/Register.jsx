import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register as registerApi } from '../services/api'

export default function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await registerApi({ username, password, email })
            navigate('/login')
        } catch (err) {
            setError('Registration failed. Please try again.')
        }
    }

    return(
        <div className='min-h-screen flex items-center justify-center'>
            <div className='bg-gray-900 p-8 rounded-xl border border-gray-800 w-full max-w-md'>
                <h2 className='text-2xl font-bold mb-6'>Register</h2>
                {error && <p style={{ color: 'red'}}> {error} </p>}
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <div className='flex flex-col'>
                        <label className='mb-1'>Username</label>
                        <input 
                            type="text"
                            value={username}
                            onChange={ (e) => setUsername(e.target.value)}
                            className='bg-gray-800 text-white px-4 py-2 rounded-lg w-full border border-gray-700 focus:outline-none focus:border-blue-500' 
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='mb-1'>Password</label>
                        <input 
                            type="password"
                            value={password}
                            onChange={ (e) => setPassword(e.target.value)}
                            className='bg-gray-800 text-white px-4 py-2 rounded-lg w-full border border-gray-700 focus:outline-none focus:border-blue-500' 
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='mb-1'>Email</label>
                        <input 
                            type="email"
                            value={email}
                            onChange={ (e) => setEmail(e.target.value)}
                            className='bg-gray-800 text-white px-4 py-2 rounded-lg w-full border border-gray-700 focus:outline-none focus:border-blue-500' 
                        />
                    </div>
                    <button type="submit" className='bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors w-full'>Register</button>
                </form>
                <p>Already have an account? <a href="/login" className='text-blue-400'>Login</a></p>
            </div>
        </div>
    )
}