import { getReviews } from "../api"
import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"

const Reviews = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        getReviews()
        .then((reviewsFromApi) => {
            setReviews(reviewsFromApi)
            setIsLoading(false)
        })
    }, [])

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <ol>
                {reviews.map((review) => {
                    return (
                        <li className="review" key={review.review_id}>
                            <Link to={`/reviews/${review.review_id}`}>
                                <h2>{review.title}</h2>
                            </Link>
                            <p>Votes: {review.votes}</p>
                            <p>Comments: {review.comment_count}</p>
                            <p>Author: {review.owner}</p>
                            <img src={review.review_img_url} alt="Review Photo"></img>
                        </li>
                )})}
            </ol>
        </div>
    )

}  

export default Reviews