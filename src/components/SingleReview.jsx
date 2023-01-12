import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { getSingleReview, getComments} from "../api"
import SingleReviewCard from "./SingleReviewCard"
import Error from "./Error"
import CommentAdder from "./CommentAdder"
import CommentDate from "./CommentDate"

const SingleReview = () => {

    const [error, setError] = useState(null)
    const [isLoadingReview, setIsLoadingReview] = useState(true)
    const [isLoadingComments, setIsLoadingComments] = useState(true)
    const [review, setReview] = useState({})
    const [comments, setComments] = useState([])
    const { review_id } = useParams()
    
    useEffect(() => {
        setIsLoadingReview(true)
        setIsLoadingComments(true)
        getSingleReview(review_id)
        .then((reviewFromApi) => {
            setReview(reviewFromApi)
            setIsLoadingReview(false)
        })
        getComments(review_id)
        .then((commentsFromApi) => {
            setComments(commentsFromApi)
            setIsLoadingComments(false)
        })
    }, [])

    if (isLoadingReview) {
        return <p>Loading Review...</p>
    }

    if (isLoadingComments) {
        return <p>Loading Comments...</p>
    }

    if (error) {
        return <Error message={error.err.message}/>
    }

    return (
        <section>
            <SingleReviewCard review={review} setError={setError}></SingleReviewCard>
            <section className="comments">
                <h1 className="commentsHeader">Comments: {review.comment_count}</h1>
                <CommentAdder setComments={setComments} review_id={review_id}></CommentAdder>
                {comments.length> 0 && 
                    <ol>
                        {comments.map((comment) => {
                            return (
                                <li className="comment" key={comment.comment_id}>
                                    <h3>
                                        By: {comment.author}
                                        <span> | </span>
                                        Votes: {comment.votes}
                                        <span> | </span>
                                        <CommentDate date={comment.created_at}></CommentDate>
                                    </h3>
                                    <p>{comment.body}</p>
                                </li>
                        )})}
                    </ol>
                }
                {comments.length === 0 && 
                    <div className="comment">
                        <h3>No Comments.</h3>
                    </div>
                }
            </section>
        </section>
    )
}

export default SingleReview