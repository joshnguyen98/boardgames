import { Link } from "react-router-dom"

const HeaderNavBar = () => {
    return (
        <nav>
            <Link to="/" className="text-link">Home</Link>
            <span> | </span>
        </nav>
    )
}

export default HeaderNavBar
