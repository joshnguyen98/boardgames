import moment from "moment"

const CommmentDate = ({date}) => {

    if (date === "just now") {
        return (
            <p>Posted {date}</p>
        )
    } else {
        return (
            <p>Posted {moment(date).fromNow()}</p>
        )
    }

}

export default CommmentDate