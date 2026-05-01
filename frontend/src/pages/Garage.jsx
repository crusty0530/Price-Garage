import { useState, useEffect, }from 'react'
import { useNavigate } from 'react-router-dom'
import { getCars, deleteCar, getCar, saveCar } from '../services/api'

export default function Garage() {
    const [cars, setCars] = useState([])

    const [deletedCar, setDeletedCar] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await getCars()
                setCars(response.data)
            } catch (err) {}
        }
        fetchCars()

        
    }, [])

    const handleDelete = async (id) => {
        try {
            const carToDelete = cars.find(car => car.id === id)
            await deleteCar(id)
            setDeletedCar(carToDelete)
            setCars(cars.filter(car => car.id !== id))

            setTimeout(() => setDeletedCar(null), 5000)
        } catch (err) {}
    }

    const handleUndo = async () => {
        try {
            await saveCar(deletedCar)
            setCars([...cars, deletedCar])
            setDeletedCar(null)
        } catch (err) {}
    }
    
    return (
    <div className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
            {/* Header row */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">My Garage</h2>
                <button 
                    onClick={() => navigate('/estimate')} 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                    Add Car
                </button>
                
            </div>

            {/* Car grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map(car => (
                    <div key={car.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                        <h3 className="text-xl font-semibold mb-4">{car.year} {car.make} {car.model}</h3>
                        <p className="text-2xl font-bold text-blue-400 mb-4">${car.estimatedPrice?.toLocaleString()}</p>
                        <p className="text-gray-400 text-sm">{car.mileage?.toLocaleString()} miles</p>
                        <p className="text-gray-400 text-sm">Condition: {car.condition}</p>
                        <button
                            onClick={() => navigate(`/garage/${car.id}`)}
                            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors w-full"
                            >
                            View Details
                        </button>
                        <button 
                            onClick={() => handleDelete(car.id)}
                            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors w-full"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
        {deletedCar && (
            <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 border border-gray-700 text-white px-6 py-3 rounded-xl flex items-center gap-4 shadow-lg">
                <span className="text-sm text-gray-300">Car deleted</span>
                <button 
                    onClick={() => handleUndo()}
                    className="text-sm text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                    Undo
                </button>
            </div>
        )}
    </div>
)
}