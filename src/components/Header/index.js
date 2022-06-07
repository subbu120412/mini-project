import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {CgProfile} from 'react-icons/cg'
import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import './header.css'

class Header extends Component {
  state = {isHamburgerClicked: false}

  showHamburger = () => {
    this.setState({
      isHamburgerClicked: true,
    })
  }

  hideHamburger = () => {
    this.setState({isHamburgerClicked: false})
  }

  logout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    const {isHamburgerClicked} = this.state
    const {location} = this.props
    const {pathname} = location

    const homeLinkClass = pathname === '/' ? 'link active-link' : 'link'
    const cartLinkClass = pathname === '/cart' ? 'link active-link' : 'link'

    return (
      <nav className="nav-bar">
        <div className="mobile-menu-container">
          <div className="home-logo-container">
            <Link className="link" to="/">
              <img
                className="logo"
                src="https://res.cloudinary.com/dfy3liyiq/image/upload/v1654013491/Frame_274_ocsqvm.png"
                alt="website logo"
              />
            </Link>
            <h1 className="tasty-kitchen">Tasty Kitchens</h1>
          </div>
          <div className="profile-hamburger-container">
            <button
              onClick={this.showHamburger}
              className="menu-icon-button"
              type="button"
            >
              <GiHamburgerMenu className="menu-icon" />
            </button>
            <Link to="/profile">
              <CgProfile className="sm-profile" color="green" size="32" />
            </Link>
          </div>
        </div>
        <div className="desktop-menu-items">
          <ul className="desktop-menu-section">
            <li className="menu-item">
              <Link className={homeLinkClass} to="/">
                Home
              </Link>
            </li>

            <li className="menu-item">
              <Link className={cartLinkClass} to="/cart">
                Cart
              </Link>
            </li>
          </ul>
          <button onClick={this.logout} className="logout-button" type="button">
            Logout
          </button>
          <Link to="/profile">
            <CgProfile className="lg-profile" color="green" size="45" />
          </Link>
        </div>

        {isHamburgerClicked && (
          <div className="menu-section-sm">
            <div className="hamburger-menu">
              <ul className="hamburger-list">
                <li className="menu-item">
                  <Link className={homeLinkClass} to="/">
                    Home
                  </Link>
                </li>
                <li className="menu-item">
                  <Link className={cartLinkClass} to="/cart">
                    Cart
                  </Link>
                </li>
              </ul>
              <button
                onClick={this.logout}
                className="logout-button"
                type="button"
              >
                Logout
              </button>
            </div>
            <button
              onClick={this.hideHamburger}
              className="menu-icon-button"
              type="button"
            >
              <AiFillCloseCircle className="menu-icon" />
            </button>
          </div>
        )}
      </nav>
    )
  }
}

export default withRouter(Header)
