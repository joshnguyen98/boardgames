import { useState } from "react"
import { patchReviewById } from "../api"

const Votes = ({votes, review_id}) => {

    const [votesChange, setVotesChange] = useState(0)

    const incVotes = () => {
        setVotesChange((currVotesChange) => currVotesChange + 1)
        patchReviewById(review_id, 1)
    }

    const decVotes = () => {
        setVotesChange((currVotesChange) => currVotesChange - 1)
        patchReviewById(review_id, -1)
    }

    return (
        <section className="votes">
            <p>
                Votes: {votes + votesChange} 
                <span> | </span>
                <button onClick={incVotes}>👍</button>
                <span>  </span>
                <button onClick={decVotes}>👎</button>
            </p>
        </section>
    )
}

export default Votes