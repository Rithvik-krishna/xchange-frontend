import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const getListings = () => api.get('/listings');                // All listings
export const getListingById = (id) => api.get(`/listings/${id}`);     // Single listing by ID
export const getUserListings = () => api.get('/listings/mine');       // YOUR listings (if you have this route)
export const addToWishlist = (listingId) => api.post('/wishlist/add', { listingId });
export const removeFromWishlist = (listingId) => api.post('/wishlist/remove', { listingId });
export const getWishlist = () => api.get('/wishlist');
export const proposeTrade = (data) => api.post('/trades', data);
export const updateListing = (id, data) => api.put(`/listings/${id}`, data);
export const deleteListing = (id) => api.delete(`/listings/${id}`);


export default api;
