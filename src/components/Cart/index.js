import Cookies from 'js-cookie'
import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import CartItem from '../CartItem'
import Header from '../Header'
import Footer from '../Footer'

import './cart.css'

class Cart extends Component {
  state = {cartList: []}

  componentDidMount() {
    this.getLocalStorage()
  }

  getLocalStorage = () => {
    const stringifiedCartItemsList = localStorage.getItem('cartData')
    if (stringifiedCartItemsList === null) {
      this.setState({cartList: []})
    } else {
      this.setState({cartList: JSON.parse(stringifiedCartItemsList)})
    }
  }

  updateCartList = () => {
    this.getLocalStorage()
  }

  showEmptyCart = () => (
    <div className="empty-cart-container">
      <img
        className="not-found-image"
        src="https://res.cloudinary.com/dfy3liyiq/image/upload/v1654426739/empty-cart_oy7jki.png"
        alt="empty cart"
      />
      <h1 className="empty-cart-heading">No Order Yet!</h1>
      <p className="empty-cart-description">
        Your cart is empty. Add something from the menu.
      </p>
      <Link to="/">
        <button className="order-button" type="button">
          Order now
        </button>
      </Link>
    </div>
  )

  showCartItems = () => {
    const {cartList} = this.state
    const totalPrice = cartList.reduce(
      (total, eachItem) => total + eachItem.quantity * eachItem.cost,
      0,
    )

    return (
      <div>
        <div className="cart-items-container">
          <div className="landscape-table-tags">
            <p className="tag">Item</p>
            <p className="tag">Quantity</p>
            <p className="tag">Price</p>
          </div>
          <ul className="cart-list">
            {cartList.map(eachCart => (
              <CartItem
                cartItemDetails={eachCart}
                key={eachCart.id}
                updateCartList={this.updateCartList}
              />
            ))}
          </ul>
          <hr className="cart-hr" />
          <div className="total-price-container">
            <h1 className="total-price-heading">Order Total:</h1>
            <div className="total-price ">
              <p className="total-price">₹</p>
              <p testid="total-price">{totalPrice}</p>
              <p className="total-price">.00</p>
            </div>
          </div>
          <Link className="link place-order-button" to="/payment">
            <button className="order-button " type="button">
              Place Order
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  render() {
    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      return <Redirect to="/login" />
    }
    const {cartList} = this.state
    return (
      <div>
        <Header />
        {cartList.length === 0 ? this.showEmptyCart() : this.showCartItems()}
      </div>
    )
  }
}

export default Cart
