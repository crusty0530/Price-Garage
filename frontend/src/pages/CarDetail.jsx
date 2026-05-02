import { getCar as getCarApi } from "../services/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function CarDetail(){
    const { id } = useParams()

    const [car, setCar] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await getCarApi(id)
                setCar(response.data)
            } catch (err) {}
        }
        fetchCar()
    }, [id])

    if (!car) return <div className='min-h-screen flex items-center justify-center'>Loading...</div>

    return(
        <div className='min-h-screen flex items-center justify-center gap-4 flex flex-col'>
            <div className='bg-gray-900 p-8 rounded-xl border border-gray-800 w-full max-w-md'>
                <button onClick={() => navigate('/garage')} className='mb-6 text-blue-400 hover:text-blue-300'>
                        ← Back to Garage
                </button>
                <h2 className='text-2xl font-bold mb-6'>Car Details</h2>
                    <div>
                        <label className='text-gray-400 text-sm'>Make</label>
                            <p className='bg-gray-800 text-white px-4 py-2 rounded-lg w-full border border-gray-700'>
                                {car.make}
                            </p>
                    </div>
                    <div>
                        <label className='text-gray-400 text-sm'>Model</label>
                            <p className='bg-gray-800 text-white px-4 py-2 rounded-lg w-full border border-gray-700'>
                                {car.model}
                            </p>
                    </div>
                    <div>
                        <label className='text-gray-400 text-sm'>Trim</label>
                            <p className='bg-gray-800 text-white px-4 py-2 rounded-lg w-full border border-gray-700'>
                                {car.trim}
                            </p>
                    </div>
                    <div>
                        <label className='text-gray-400 text-sm'>Year</label>
                            <p className='bg-gray-800 text-white px-4 py-2 rounded-lg w-full border border-gray-700'>
                                {car.year}
                            </p>
                    </div>
                    <div>
                        <label className='text-gray-400 text-sm'>Mileage</label>
                            <p className='bg-gray-800 text-white px-4 py-2 rounded-lg w-full border border-gray-700'>
                                {car.mileage}
                            </p>
                    </div>
                    <div>
                        <label className='text-gray-400 text-sm'>Condition</label>
                            <p className='bg-gray-800 text-white px-4 py-2 rounded-lg w-full border border-gray-700'>
                                {car.condition}
                            </p>
                    </div>
                    <div>
                        <label className='text-gray-400 text-sm'>Body</label>
                            <p className='bg-gray-800 text-white px-4 py-2 rounded-lg w-full border border-gray-700'>
                                {car.body}
                            </p>
                    </div>
                    <div>
                        <label className='text-gray-400 text-sm'>Transmission</label>
                            <p className='bg-gray-800 text-white px-4 py-2 rounded-lg w-full border border-gray-700'>
                                {car.transmission}
                            </p>
                    </div>
                    <div>
                        <label className='text-gray-400 text-sm'>Color</label>
                            <p className='bg-gray-800 text-white px-4 py-2 rounded-lg w-full border border-gray-700'>
                                {car.color}
                            </p>
                    </div>
                    <div>
                        <label className='text-gray-400 text-sm'>Interior</label>
                            <p className='bg-gray-800 text-white px-4 py-2 rounded-lg w-full border border-gray-700'>
                                {car.interior}
                            </p>
                    </div>
                    <div>
                        <label className='text-gray-400 text-sm'>State</label>
                            <p className='bg-gray-800 text-white px-4 py-2 rounded-lg w-full border border-gray-700'>
                                {car.state}
                            </p>
                    </div>
                    <div>
                        <label className='text-gray-400 text-sm'>Estimated Price</label>
                            <p className='bg-gray-800 text-white px-4 py-2 rounded-lg w-full border border-gray-700'>
                                ${Math.round(car.estimatedPrice).toLocaleString()}
                            </p>
                    </div>
                    
                </div>
            </div>
    )
}
