import { Navbar } from 'react-bootstrap'
import {Navigation} from '../Navigation/Navigation'
import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import {Container} from 'react-bootstrap'
import './header.css'

export const Header = ()=>{
    return (
      <Navbar bg="dark" variant="dark" className='custom-navbar'>
    <Container>
    <Navbar.Brand className='custom-navbar'><Link to ='/'>Doodle</Link></Navbar.Brand>
    <Nav className="me-auto">
     <Navigation/>
    </Nav>
    </Container>
  </Navbar>
      
  //   {/* <div className="#hgroup">
  //   <header id="header" className="clear">
  //     <div id="hgroup">
  //       <h1><Link to="/">Doodle</Link></h1>
  //       <h2>Draw It!</h2>
  //     </div>
  //     <nav className='#hgroup'>
  //       <Navigation/>
  //     </nav>
  //   </header>
  // </div> */}
  )
}