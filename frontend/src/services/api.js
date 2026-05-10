import axios from 'axios'

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
})

// authentication routes
export const register = (data) => API.post('/auth/register', data)
export const login = (data) => API.post('/auth/login', data)
export const resetPassword = (data) => API.post('/auth/reset-password', data)
export const forgotPassword = (data) => API.post('/auth/forgot-password', data)

// car routes
export const getCars = () => API.get('/cars')
export const saveCar = (data) => API.post('/cars', data)
export const deleteCar = (id) => API.delete(`/cars/${id}`)
export const getCar = (id) => API.get(`/cars/${id}`)
export const editCar = (id, data) => API.put(`/cars/${id}`, data)

//profile routes
export const getUser = (id) => API.get(`/user/${id}`)
export const updateUserProfile = (data) => API.patch(`/user/me`, data)
export const getCurrentUser = () => API.get(`/user/me`)
