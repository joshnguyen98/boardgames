import { getReviews } from "../api"
import { useEffect } from "react"
import { useState } from "react"
import { Link, useParams, useSearchParams } from "react-router-dom"
import moment from "moment"

const Reviews = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [reviews, setReviews] = useState([])
    const [error, setError] = useState(null)
    const { slug } = useParams()
    const [sortBy, setSortBy] = useState('created_at')
    const [orderBy, setOrderBy] = useState('desc')
    const [searchParams, setSearchParams] = useSearchParams()
    
    useEffect(() => {
        setError(null)
        setIsLoading(true)
        setSearchParams({"sort_by": sortBy, "order": orderBy})
        getReviews(slug, sortBy, orderBy)
        .then((reviewsFromApi) => {
            setReviews(reviewsFromApi)
            setIsLoading(false)
        }).catch((err) => {
            setIsLoading(false)
            setError(err)
        })
    }, [slug, sortBy, orderBy])

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Oops, that category doesn't exist.</p>
    }

    return (
        <div>
            <section className="filterBar">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="created_at">Date</option>
                    <option value="comment_count">Number of Comments</option>
                    <option value="votes">Number of Votes</option>
                </select>
                <select value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </section>
            <ol>
                {reviews.map((review) => {
                    return (
                        <li className="review" key={review.review_id}>
                            <Link to={`/reviews/${review.review_id}`} className="text-link">
                                    <h2>{review.title}</h2>
                            </Link>
                            <p>By: {review.owner} | {moment(review.created_at).fromNow()}</p>
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