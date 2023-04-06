import { Link } from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'
import { useContext } from 'react'

export const Navigation = () => {
    const {isAuthenticated,userEmail}=useContext(AuthContext)
    return (
        <ul>
            <li> <Link className=".navbar a" to="/">Home</Link></li>
           
                {!isAuthenticated && (
                    
                       <>
                        <li> <Link className=".navbar a" to="/login">Login</Link></li>
                        <li> <Link className=".navbar a" to="/register">Register</Link></li>
                        </>
                )}
                {isAuthenticated && (
                   <>
                        <li> <Link className=".navbar a" to="/canvas">Start Drawing</Link></li>
                         <li> <Link className=".navbar a" to="/logout">Log Out</Link></li>
                        </>
                )}
            
            <li> <Link className=".navbar a" to="/drawings">Drawings</Link></li>
           
        </ul>
    )
}