import { Link } from "react-router-dom"

const CategoryNavBar = () => {
    return (
        <nav>
            <Link to="/reviews" className="text-link">All Reviews</Link>
            <span> | </span>
        </nav>
    )
}

export default CategoryNavBar