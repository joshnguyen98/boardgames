import { useState } from "react"
import { postCommentByReviewId } from "../api"

const CommentAdder = ({setComments, review_id, orComments, setOrComments}) => {

    const [isPosting, setIsPosting] = useState(false)
    const [error, setError] = useState(null)
    const [successMessage, setSuccessMessage] = useState('')
    const [newComment, setNewComment] = useState('')
    

    const handleSubmit = (e) => {
        e.preventDefault()
        const commentToAdd = {
            "comment_id": Date.now(),
            "body": newComment,
            "review_id": review_id,
            "author": "jessjelly",
            "votes": 0,
            "created_at": "just now"
        }
        setOrComments((currComments) => {
            return [commentToAdd, ...currComments]
        })
        console.log(orComments, "<------- BEFORE POSTING")
        setIsPosting(true)
        setComments((currComments) => {
            return [commentToAdd, ...currComments]
        })
        postCommentByReviewId(review_id, newComment)
        .then(() => {
            setNewComment('')
            setIsPosting(false)
            setSuccessMessage("You posted a new comment!")
            setOrComments((currComments) => {
                return currComments.filter((comment) => {
                    return comment.comment_id !== commentToAdd.comment_id
                })
            })
            console.log(orComments, "<------- AFTER POSTING")
        }).catch((err) => {
            setIsPosting(false)
            setError(err)
            setComments((currComments) => {
                return [...currComments.slice(1)]
            })
        })
    }

    if (isPosting) {
        return <p>Your comment is posting!</p>
    }

    return (
        <section>
            <form onSubmit={handleSubmit}>
                <textarea 
                    className="textarea"
                    required
                    placeholder="What do you think about this review?"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                ></textarea>
                <button className="submitButton">Post Comment</button>
                <p>{successMessage}</p>
                {error && <p>Your comment failed to post.</p>}
            </form>
        </section>
    )

}

export default CommentAdder