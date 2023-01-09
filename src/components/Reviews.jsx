import { getReviews } from "../api"
import { useEffect } from "react"
import { useState } from "react"

const Reviews = () => {

    const [reviews, setReviews] = useState([])

    useEffect(() => {
        getReviews()
        .then((reviews) => {
            setReviews(reviews)
        })
    }, [reviews])


    return (
        <div>
            <ol>
                {reviews.map((review) => {
                    return (
                        <li className="review" key={review.review_id}>
                            <h2>{review.title}</h2>
                            <p>Votes: {review.votes}</p>
                            <p>Author: {review.owner}</p>
                            <img src={review.review_img_url} alt="Review Photo"></img>
                        </li>
                )})}
            </ol>
        </div>
    )

}  

export default Reviews