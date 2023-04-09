import { Link } from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'
import { useContext } from 'react'
import { Nav } from "react-bootstrap"

export const Navigation = () => {
    const {isAuthenticated,userEmail}=useContext(AuthContext)

    
    return (
       
        (
       
            <>
                 <Nav.Item >
                 <Link className="navbar-link" to="/">Home</Link>
                 </Nav.Item>
                  
                
                     {!isAuthenticated && (
                         
                           <>
                             <Nav.Item as="li"> <Link className="navbar-link" to="/login">Login</Link> </Nav.Item>
                             <Nav.Item as="li"> <Link className="navbar-link" to="/register">Register</Link> </Nav.Item>
                         </>
                                 
                     )}
                     {isAuthenticated && (
                        <>
                             <Nav.Item as="li"> <Link className="navbar-link" to="/canvas">Start Drawing</Link></Nav.Item>
                             <Nav.Item as="li"> <Link className="navbar-link" to="/logout">Log Out</Link></Nav.Item>
                             </>
                     )}
                 
                     <Nav.Item as="li"> <Link className="navbar-link" to="/drawings">Drawings</Link></Nav.Item>
                
                 </>
           
         )
      
    )
    
}


 


