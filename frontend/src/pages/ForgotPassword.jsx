import { useState } from 'react'
import { forgotPassword as forgotPasswordApi } from '../services/api'

export default function ForgotPassword(){
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await forgotPasswordApi({ email })
            setSuccess('Email sent!')
        } catch (err) {
            setError('Email not found')
        }
    }

    return(
        <div className='min-h-screen flex items-center justify-center'>
            <div className='bg-gray-900 p-8 rounded-xl border border-gray-800 w-full max-w-md'>
                <h2 className='text-2xl font-bold mb-6'>Forgot Password?</h2>
                {error && <p className='text-red-500 mb-4'>{error}</p>}
                {success && <p className='text-green-500 mb-4'>{success}</p>}
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <div className='flex flex-col'>
                        <label className='mb-1'>Email</label>
                        <input 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='bg-gray-800 text-white px-4 py-2 rounded-lg w-full border border-gray-700 focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <button type='submit' className='bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors w-full'>Send Email</button>
                </form>
            </div>
        </div>
    )
}