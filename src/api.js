import axios from "axios";

const api = axios.create({
    baseURL: 'https://josh-nguyen-boardgames.onrender.com/api'
})

export const getReviews = () => {
    return api.get(`/reviews`)
    .then((res) => {
        return res.data.reviews
    })
}