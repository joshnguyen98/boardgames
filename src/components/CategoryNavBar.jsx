import { Link } from "react-router-dom"
import { getCategories } from "../api"
import { useEffect, useState } from "react"

const CategoryNavBar = () => {
    const [categories, setCategories] = useState([])

    const formatWord = (y) => {
        return y.replace('-', ' ').replace('-', ' ') .replace(/(?:^|\s)\S/g, a => a.toUpperCase());
    }

    useEffect(() => {
        getCategories()
        .then((categories) => {
            setCategories(categories)
        })
    }, [])

    return (
        <section>
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
                    > | {formatWord(category.slug)}
                    </Link>
                ))}
            </nav>
        </section>
    )
}

export default CategoryNavBar