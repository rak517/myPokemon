import { Link } from "react-router-dom";
import './Header.css'


const Header = () => {

  return (
    <header className="Header">
      <nav>
        <ul>
          <li><Link to="/">HOME</Link></li>
          <li><Link to="/login">LOGIN</Link></li>
          <li><Link to="/signup">SIGNUP</Link></li>
          <li><Link to="/mypokedex">FAVORITE</Link></li>
        </ul>
      </nav>
      <div className="header_search">
        <input className="search_input" type="text" placeholder="Search Pokemon.." />
      </div>
    </header>
  )
}

export default Header;