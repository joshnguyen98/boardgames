import { Link } from "react-router-dom"
import { getCategories } from "../api"
import { useEffect, useState } from "react"

const CategoryNavBar = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories()
        .then((categories) => {
            setCategories(categories)
        })
    }, [])

    return (
        <nav>
             <Link 
                to="/reviews" 
                className="text-link"
            >All</Link>   
            {categories.map((category) => (
                    <Link 
                        to={`/reviews/category/${category.slug}`}
                        className="text-link"
                        key={category.slug}
                    > | {category.slug}</Link>
            ))}
        </nav>
    )
}

export default CategoryNavBar