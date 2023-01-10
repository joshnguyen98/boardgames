import CategoryNavBar from "./CategoryNavBar"
import HeaderNavBar from "./HeaderNavBar"

const Header = () => {
    return (
        <header>
            <HeaderNavBar />
            <h1>Boardgames Reviews</h1>
            <CategoryNavBar />
        </header>
    )
}

export default Header