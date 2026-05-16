import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUser as getUserApi } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Profile(){
    const { id } = useParams();
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { user: currentUser} = useAuth()

    const isOwnProfile = currentUser && String(currentUser.id) === id

    useEffect(() => {
        getUserApi(id)
            .then((res) => setProfile(res.data))
            .catch((err) => setError(err.response?.data?.message || "Failed to load"))
            .finally(() => setLoading(false)) 
    }, [id])

    if (loading) return <div>loading</div>
    if (error) return <div>Error: {error}</div>
    if (!profile) return <div>Profile not found</div>

    return(
        <div className="max-w-4xl mx-auto p-6">
            {/* HEADER */}
            <div className="flex items-start gap-6 mb-6">
                {/* Avatar placeholder for now */}
                {profile.avatarUrl ? (
                    <img 
                        src={profile.avatarUrl} 
                        alt={profile.username}
                        className="w-24 h-24 rounded-full object-cover flex-shrink-0"
                    />
                ) : (
                    <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                        {profile.username[0].toUpperCase()}
                    </div>
                )}

                {/* Name + metadata */}
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-white">{profile.displayName || profile.username}</h1>
                    <p className="text-gray-400">@{profile.username}</p>
                    {profile.location && (
                        <p className="text-gray-400 text-sm mt-1">📍 {profile.location}</p>
                    )}
                    <p className="text-gray-500 text-sm mt-1">Joined {new Date(profile.createdAt).toLocaleDateString()}</p>
                </div>

                {isOwnProfile && (
                    <Link to="/profile/edit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer">
                        Edit
                    </Link>
                )}
            </div>

            {/* BIO */}
            {profile.bio && (
                <p className="text-gray-300 mb-6">{profile.bio}</p>
            )}

            {/* STATS - placeholder will style next*/}
            <div className="flex gap-8 mb-8 border-y border-gray-700 py-4">
                <div>
                    <p className="text-2xl font-bold text-white">{profile.carCount}</p>
                    <p className="text-gray-400 text-sm">Cars</p>
                </div>
                <div>
                    <p className="text-2xl font-bold text-white">
                        ${Math.round(profile.totalGarageValue).toLocaleString()}
                    </p>
                    <p className="text-gray-400 text-sm">Total Value</p>
                </div>
                <div>
                    <p className="text-2xl font-bold text-white">{profile.followerCount}</p>
                    <p className="text-gray-400 text-sm">Followers</p>
                </div>
            </div>
            
            {/* GARAGE */}
            <h2 className="text-xl font-bold text-white mb-4">Garage</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {profile.cars.map(car => (
                    <div key={car.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                        <div className='flex justify-between items-center'>
                            <h3 className="text-xl font-semibold mb-4">{car.year} {car.make} {car.model}</h3>
                        </div>
                        <p className="text-2xl font-bold text-blue-400 mb-4">${Math.round(car.estimatedPrice).toLocaleString()}</p>
                        <p className="text-gray-400 text-sm">{car.mileage?.toLocaleString()} miles</p>
                        <p className="text-gray-400 text-sm">Condition: {car.condition}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}