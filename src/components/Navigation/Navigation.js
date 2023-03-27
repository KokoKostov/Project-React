import { Link } from "react-router-dom"

export const Navigation = () => {
    return (
        <ul>
            <li> <Link className=".navbar a" to="/login">Login</Link></li>
            <li> <Link className=".navbar a" to="/register">Register</Link></li>
            <li> <Link className=".navbar a" to="/drawings">Drawings</Link></li>
            <li> <Link className=".navbar a" to="/">Log Out</Link></li>
            <li> <Link className=".navbar a" to="/canvas">Start Drawing</Link></li>
        </ul>
    )
}