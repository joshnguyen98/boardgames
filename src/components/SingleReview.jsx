import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { getSingleReview, getComments} from "../api"

const SingleReview = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [review, setReview] = useState({})
    const [comments, setComments] = useState([])
    const { review_id } = useParams()
    
    useEffect(() => {
        setIsLoading(true)
        getSingleReview(review_id)
        .then((reviewFromApi) => {
            setReview(reviewFromApi)
            setIsLoading(false)
        })
        getComments(review_id)
        .then((commentsFromApi) => {
            setComments(commentsFromApi)
        })
    }, [])

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (comments.length === 0) {
        return (
            <div>
                <div className="singleReview">
                    <h2>{review.title}</h2>
                    <p>Votes: {review.votes}</p>
                    <p>Comments: {review.comment_count}</p>
                    <p>Designer: {review.designer}</p>
                    <p>Author: {review.owner}</p>
                    <img src={review.review_img_url} alt="Review Photo"></img>
                    <p>{review.review_body}</p>
                </div>
                <div className="comment">
                    <h3>No Comments.</h3>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="singleReview">
                <h2>{review.title}</h2>
                <p>Votes: {review.votes}</p>
                <p>Comments: {review.comment_count}</p>
                <p>Designer: {review.designer}</p>
                <p>Author: {review.owner}</p>
                <img src={review.review_img_url} alt="Review Photo"></img>
                <p>{review.review_body}</p>
            </div>
            <ol>
                {comments.map((comment) => {
                    return (
                        <li className="comment" key={comment.comment_id}>
                            <h3>
                                By: {comment.author}
                                <span> | </span>
                                Votes: {comment.votes}
                            </h3>
                            <p>{comment.body}</p>
                        </li>
                )})}
            </ol>
        </div>
    )
}

export default SingleReview