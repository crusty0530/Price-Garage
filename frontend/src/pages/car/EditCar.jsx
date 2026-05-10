/* eslint-disable no-empty */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
import { editCar as editCarApi } from "../../services/api";
import { getCar as getCarApi } from "../../services/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function EditCar(){
    const { id } = useParams()

    const [car, setCar] = useState(null)
    const [error, setError] = useState('')

    const [formData, setFormData] = useState({
    make: '', model: '', trim: '', year: '', mileage: '',
    condition: '', body: '', transmission: '', color: '', interior: '', state: '', isPublic: false
    })

    // Update formData once car loads
    useEffect(() => {
        if (car) {
            setFormData({
                make: car.make || '',
                model: car.model || '',
                trim: car.trim || '',
                year: car.year || '',
                mileage: car.mileage || '',
                condition: car.condition || '',
                body: car.body || '',
                transmission: car.transmission || '',
                color: car.color || '',
                interior: car.interior || '',
                state: car.state || '',
                isPublic: car.isPublic || false
            })
        }
    }, [car])
    
    useEffect(() => {
            const fetchCar = async () => {
                try {
                    const response = await getCarApi(id)
                    setCar(response.data)
                } catch (err) {}
            }
            fetchCar()
        }, [id])

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
            e.preventDefault()
            console.log('Submitting:', id, formData)
            try {
                await editCarApi(id, formData)
                navigate(`/garage/${car.id}`)
            } catch (err) {
                setError('Failed to save car. Please try again.')
            }
        }
    

    if (!car) return <div className='min-h-screen flex items-center justify-center'>Loading...</div>

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
                    <div>
                        <label>Visibility</label>
                        <div className="flex items-center ps-4 bg-gray-800 border border-gray-700 rounded-lg shadow-xs">
                            <input
                                type="checkbox"
                                id="isPublic"
                                name="isPublic"
                                checked={formData.isPublic}
                                onChange={handleChange}
                                className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft"
                            />
                            <label htmlFor="isPublic" className="select-none w-full py-3 ms-2 text-sm font-medium text-heading">
                                Show this car on my public profile
                            </label>
                        </div>
                    </div>
                    <button type='submit' className='bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition-colors w-full'>Get Estimate</button>
                </form>
                    <p><a href="/garage" className='text-blue-400'>Back to Garage</a></p>
            </div>
        </div>
    )
}
