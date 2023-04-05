import {Navigation} from '../Navigation/Navigation'
import { Link } from 'react-router-dom'
export const Header = ()=>{
    return (
    <div className="#hgroup">
    <header id="header" className="clear">
      <div id="hgroup">
        <h1><Link to="/">Doodle</Link></h1>
        <h2>Draw It!</h2>
      </div>
      <nav className='#hgroup'>
        <Navigation/>
      </nav>
    </header>
  </div>)
}