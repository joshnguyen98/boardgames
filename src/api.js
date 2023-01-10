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

export const getSingleReview = (review_id) => {
    return api.get(`/reviews/${review_id}`)
    .then((res) => {
        return res.data.review
    })
}

export const getComments = (review_id) => {
    return api.get(`/reviews/${review_id}/comments`)
    .then((res) => {
        return res.data.comments
    })
}
