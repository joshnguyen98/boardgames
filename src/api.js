import axios from "axios";

const api = axios.create({
    baseURL: 'https://josh-nguyen-boardgames.onrender.com/api'
})

export const getReviews= (category, sortBy, orderBy) => {
    return api.get(`/reviews`, {params: {category: category, sort_by: sortBy, order: orderBy}})
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

export const patchReviewById = (review_id, increment) => {
    return api.patch(`/reviews/${review_id}`, {inc_votes: increment})
}

export const postCommentByReviewId = (review_id, newCommentText) => {
    const postBody = {
        username: 'jessjelly',
        body: newCommentText,
    }
    return api.post(`/reviews/${review_id}/comments`, postBody)
    .then((res) => {
        return res.data.comments
    })
}

export const getCategories = () => {
    return api.get(`/categories`)
    .then((res) => {
        return res.data.categories
    })
}

export const deleteComment = (comment_id) => {
    return api.delete(`/comments/${comment_id}`)
}