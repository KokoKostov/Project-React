import {Navigation} from '../Navigation/Navigation'
export const Header = ()=>{
    return (
    <div className="#hgroup">
    <header id="header" className="clear">
      <div id="hgroup">
        <h1><a href="/">Doodle</a></h1>
        <h2>Draw It!</h2>
      </div>
      <nav className='#hgroup'>
        <Navigation/>
      </nav>
    </header>
  </div>)
}