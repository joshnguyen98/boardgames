import Votes from "./Votes"

const SingleReviewCard = ({review}) => {
    return (
        <section className="singleReview">
            <h2>{review.title}</h2>
            <p>By: {review.owner}</p>
            <Votes votes={review.votes} review_id={review.review_id}></Votes>
            <p>Designer: {review.designer}</p>
            <img src={review.review_img_url} alt="Review Photo"></img>
            <p>{review.review_body}</p>
        </section>
    )
}

export default SingleReviewCard