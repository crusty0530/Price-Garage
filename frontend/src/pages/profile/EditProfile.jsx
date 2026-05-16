import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { updateUserProfile } from "../../services/api"

export default function EditProfile(){
    const {user, updateUser} = useAuth()
    const navigate = useNavigate()
    
    const [formData, setFormData] = useState({
        displayName: user?.displayName || "",
        bio: user?.bio || "",
        avatarUrl: user?.avatarUrl || "",
        location: user?.location || ""
    })

    const [error, setError] = useState(null)
    const [submitting, setSubmitting] = useState(false)

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        setError(null)
        try {
            const response = await updateUserProfile(formData)
            updateUser(response.data)
            navigate(`/profile/${user.id}`)
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update profile")
            setSubmitting(false)
        }
    }

    if (!user) return <div className="text-white p-8">Loading...</div>

    return(
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-white mb-6">Edit Profile</h1>
            
            {error && <p className="text-red-400 mb-4">{error}</p>}
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-300 mb-1" htmlFor="displayName">
                        Display Name
                    </label>
                    <input
                        id="displayName"
                        name="displayName"
                        type="text"
                        value={formData.displayName}
                        onChange={handleChange}
                        maxLength={50}
                        className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                    />
                </div>
                
                <div>
                    <label className="block text-gray-300 mb-1" htmlFor="bio">
                        Bio
                    </label>
                    <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        maxLength={280}
                        rows={4}
                        className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        {formData.bio.length}/280
                    </p>
                </div>
                
                <div>
                    <label className="block text-gray-300 mb-1" htmlFor="avatarUrl">
                        Avatar URL
                    </label>
                    <input
                        id="avatarUrl"
                        name="avatarUrl"
                        type="url"
                        value={formData.avatarUrl}
                        onChange={handleChange}
                        maxLength={500}
                        className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                    />
                </div>
                
                <div>
                    <label className="block text-gray-300 mb-1" htmlFor="location">
                        Location
                    </label>
                    <input
                        id="location"
                        name="location"
                        type="text"
                        value={formData.location}
                        onChange={handleChange}
                        maxLength={100}
                        className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                    />
                </div>
                
                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                        {submitting ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(`/profile/${user.id}`)}
                        className="bg-gray-700 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}