import { useState, useEffect }from 'react'
import { useNavigate } from 'react-router-dom'
import { saveCar } from '../services/api'

export default function Estimate() {
    const [formData, setFormData] = useState({
        make: '',
        model: '',
        trim: '',
        year: '',
        mileage: '',
        condition: '',
        body: '',
        transmission: '',
        color: '',
        interior: '',
        state: '',
    })

    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await saveCar(formData)
            navigate('/garage')
        } catch (err) {
            setError('Failed to save car. Please try again.')
        }
    }

    return(
        <div className='min-h-screen flex items-center justify-center'>
            <div className='bg-gray-900 p-8 rounded-xl border border-gray-800 w-full max-w-md'>
                <h2 className='text-2xl font-bold mb-6'>Estimate Car Price</h2>
                {error}
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <div>
                        <label>Make</label>
                        <input name='make' value={formData.make} onChange={handleChange} 
                            className='bg-gray-800 text-white px-4 py-2 rounded-lg w-full border border-gray-700 focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <div>
                        <label>Model</label>
                        <input name='model' value={formData.model} onChange={handleChange} 
                            className='bg-gray-800 text-white px-4 py-2 rounded-lg w-full border border-gray-700 focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <div>
                        <label>Trim</label>
                        <input name='trim' value={formData.trim} onChange={handleChange} 
                            className='bg-gray-800 text-white px-4 py-2 rounded-lg w-full border border-gray-700 focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <div>
                        <label>Year</label>
                        <input name='year' value={formData.year} onChange={handleChange} 
                            className='bg-gray-800 text-white px-4 py-2 rounded-lg w-full border border-gray-700 focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <div>
                        <label>Mileage</label>
                        <input name='mileage' value={formData.mileage} onChange={handleChange} 
                            className='bg-gray-800 text-white px-4 py-2 rounded-lg w-full border border-gray-700 focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <div>
                        <label>Condition</label>
                        <input name='condition' value={formData.condition} onChange={handleChange} 
                            className='bg-gray-800 text-white px-4 py-2 rounded-lg w-full border border-gray-700 focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <div>
                        <label>Body</label>
                        <input name='body' value={formData.body} onChange={handleChange} 
                            className='bg-gray-800 text-white px-4 py-2 rounded-lg w-full border border-gray-700 focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <div>
                        <label>Transmission</label>
                        <input name='transmission' value={formData.transmission} onChange={handleChange} 
                            className='bg-gray-800 text-white px-4 py-2 rounded-lg w-full border border-gray-700 focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <div>
                        <label>Color</label>
                        <input name='color' value={formData.color} onChange={handleChange} 
                            className='bg-gray-800 text-white px-4 py-2 rounded-lg w-full border border-gray-700 focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <div>
                        <label>Interior</label>
                        <input name='interior' value={formData.interior} onChange={handleChange} 
                            className='bg-gray-800 text-white px-4 py-2 rounded-lg w-full border border-gray-700 focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <div>
                        <label>State</label>
                        <input name='state' value={formData.state} onChange={handleChange} 
                            className='bg-gray-800 text-white px-4 py-2 rounded-lg w-full border border-gray-700 focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <button type='submit' className='bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors w-full'>Get Estimate</button>
                </form>
                    <p><a href="/garage" className='text-blue-400'>Back to Garage</a></p>
            </div>
        </div>
    )
}