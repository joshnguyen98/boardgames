import { useState } from "react"
import { patchReviewById } from "../api"

const Votes = ({votes, review_id, setError}) => {

    const [votesChange, setVotesChange] = useState(0)

    const incVotes = (increment) => {
        setVotesChange((currVotesChange) => currVotesChange + increment)
        patchReviewById(review_id, increment)
        .catch((err) => {
            setError({ err })
        })
    }

    return (
        <section className="votes">
            <p>
                Votes: {votes + votesChange} 
                <span> | </span>
                <button onClick={() => {incVotes(1)}}>👍</button>
                <span>  </span>
                <button onClick={() => {incVotes(-1)}}>👎</button>
            </p>
        </section>
    )
}

export default Votes