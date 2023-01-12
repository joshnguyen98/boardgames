import { getReviews } from "../api"
import { useEffect } from "react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"

const Reviews = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [reviews, setReviews] = useState([])
    const [error, setError] = useState(null)
    const { slug } = useParams()

    useEffect(() => {
        setError(null)
        setIsLoading(true)
        getReviews(slug)
        .then((reviewsFromApi) => {
            setReviews(reviewsFromApi)
            setIsLoading(false)
        }).catch((err) => {
            setIsLoading(false)
            setError(err)
        })
    }, [slug])

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Oops, that category doesn't exist.</p>
    }

    return (
        <div>
            <ol>
                {reviews.map((review) => {
                    return (
                        <li className="review" key={review.review_id}>
                            <Link to={`/reviews/${review.review_id}`} className="text-link">
                                    <h2>{review.title}</h2>
                            </Link>
                            <p>By: {review.owner}</p>
                            <p>{review.category}</p>
                            <p>
                                Votes: {review.votes}
                                <span> | </span>
                                Comments: {review.comment_count}
                            </p>
                            <img src={review.review_img_url} alt="Review Photo"></img>
                        </li>
                )})}
            </ol>
        </div>
    )

}  

export default Reviews