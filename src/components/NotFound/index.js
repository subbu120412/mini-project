import {Link} from 'react-router-dom'
import './not-found.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      className="not-found-image"
      src="https://res.cloudinary.com/dfy3liyiq/image/upload/v1654248838/not-found_xusu9n.jpg"
      alt="not found"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-description">
      we are sorry, the page you requested could not be found.Please go back to
      the homepage
    </p>
    <Link to="/">
      <button className="not-found-button" type="button">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
