import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { getSingleReview, getComments, deleteComment} from "../api"
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
    const [deletedComment, setDeletedComment] = useState([])
    const [orComments, setOrComments] = useState([])
    
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

    const removeComment = (commentToDelete) => {
        setDeletedComment(commentToDelete)
        setComments((currComments) => {
            return currComments.filter((comment) => 
                comment.comment_id !== commentToDelete.comment_id
            )
        })
        deleteComment(commentToDelete.comment_id)
        .catch((err) => {
            setComments((currComments) => {
                return [deletedComment, ...currComments]
            })
            setError({ err })
        })
    }

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
                <CommentAdder setComments={setComments} review_id={review_id} orComments={orComments} setOrComments={setOrComments}></CommentAdder>
                {comments.length > 0 && 
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
                                    {comment.author === "jessjelly" && <button className="deleteButton" onClick={() => {removeComment(comment)}}>Delete</button>}
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