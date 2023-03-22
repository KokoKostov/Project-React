export const Header = ()=>{
    return (
    <div className="wrapper row1">
    <header id="header" className="clear">
      <div id="hgroup">
        <h1><a href="/">Doodle</a></h1>
        <h2>Draw It!</h2>
      </div>
      <nav>
        <ul>
          <li><a href="/">Login</a></li>
          <li><a href="/">Register</a></li>
          <li><a href="/">Drawings</a></li>
          <li><a href="/">Log Out</a></li>
          <li className="last"><a href="/">Start Drawing</a></li>
        </ul>
      </nav>
    </header>
  </div>)
}