const Error = ({message}) => {

    if (message !== undefined) {
        return (
            <p>{message}</p>
        )
    } else {
        return (
            <p>Oops, that doesn't exist.</p>
        )
    }
}

export default Error