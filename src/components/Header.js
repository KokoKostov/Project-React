import {Navigation} from './Navigation'
export const Header = ()=>{
    return (
    <div className="wrapper row1">
    <header id="header" className="clear">
      <div id="hgroup">
        <h1><a href="/">Doodle</a></h1>
        <h2>Draw It!</h2>
      </div>
      <nav>
        <Navigation/>

      </nav>
    </header>
  </div>)
}