import {Link} from 'react-router-dom'
import './payment.css'

const Payment = () => (
  <div className="not-found-container">
    <img
      className="payment-image"
      src="https://res.cloudinary.com/dfy3liyiq/image/upload/v1654451202/payment_gb3rsh.png"
      alt="not found"
    />
    <h1 className="not-found-heading">Payment Successful</h1>
    <p className="not-found-description">
      Thank you for ordering Your payment is successfully completed.
    </p>
    <Link to="/">
      <button className="not-found-button" type="button">
        Go To Home Page
      </button>
    </Link>
  </div>
)

export default Payment
