import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-logo-container">
        <img
          className="footer-logo-image"
          src="https://res.cloudinary.com/dfy3liyiq/image/upload/v1654307870/footer-logo_chc6vv.png"
          alt="website-footer-logo"
        />
        <h1 className="footer-heading">Tasty Kitchen</h1>
      </div>
      <p className="footer-description">
        The only thing we are serious about is food. Contact us on
      </p>
      <div className="footer-social-logo-container">
        <FaPinterestSquare
          className="social-icon"
          testid="pintrest-social-icon"
        />
        <FaInstagram className="social-icon" testid="instagram-social-icon" />
        <FaTwitter className="social-icon" testid="twitter-social-icon" />
        <FaFacebookSquare
          className="social-icon"
          testid="facebook-social-icon"
        />
      </div>
    </div>
  )
}
