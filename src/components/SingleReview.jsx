import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { getSingleReview } from "../api"

const SingleReview = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [review, setReview] = useState({})
    const { review_id } = useParams()
    
    useEffect(() => {
        getSingleReview(review_id)
        .then((reviewFromApi) => {
            setReview(reviewFromApi)
            setIsLoading(false)
        })
    }, [])

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div className="singleReview">
            <h2>{review.title}</h2>
            <p>Votes: {review.votes}</p>
            <p>Comments: {review.comment_count}</p>
            <p>Designer: {review.designer}</p>
            <p>Author: {review.owner}</p>
            <img src={review.review_img_url} alt="Review Photo"></img>
            <p>{review.review_body}</p>
        </div>
    )
}

export default SingleReview