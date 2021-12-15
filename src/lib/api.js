import axios from "axios";

export const fetchItemApi = (itemId) => axios.get(`https://reqres.in/api/users/${itemId}`)

export const fetchItemListApi = () => axios.get("https://reqres.in/api/users?page=2")

// export const removeItemApi = (itemId) => axios.delete(`/items/${itemId}`)