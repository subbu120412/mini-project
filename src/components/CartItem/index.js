import {Component} from 'react'

import './cartitem.css'

class CartItem extends Component {
  state = {quantity: 0}

  componentDidMount = () => {
    const {cartItemDetails} = this.props
    const {quantity} = cartItemDetails

    this.setState({quantity})
  }

  getLocalStorage = () => {
    const stringifiedCartItemsList = localStorage.getItem('cartData')
    if (stringifiedCartItemsList === null) {
      return []
    }
    return JSON.parse(stringifiedCartItemsList)
  }

  setLocalStorage = () => {
    const {quantity} = this.state
    const {cartItemDetails} = this.props
    const {imageUrl, name, id, cost} = cartItemDetails
    const cartList = this.getLocalStorage()
    const getExistedItem = cartList.find(eachItem => eachItem.id === id)

    if (getExistedItem === undefined) {
      const itemDetails = {imageUrl, name, quantity, id, cost}
      cartList.push(itemDetails)
      localStorage.setItem('cartData', JSON.stringify(cartList))
    } else {
      const updatedCartList = cartList.map(eachItem => {
        if (eachItem.id === id) {
          return {
            ...eachItem,
            quantity,
          }
        }
        return eachItem
      })
      localStorage.setItem('cartData', JSON.stringify(updatedCartList))
    }
  }

  removeFromLocalStorage = (foodItemCount, id) => {
    const cartList = this.getLocalStorage()
    const updatedCartList = cartList.filter(eachItem => eachItem.id !== id)
    localStorage.setItem('cartData', JSON.stringify(updatedCartList))
  }

  onDecrement = async () => {
    const {quantity} = this.state
    const {cartItemDetails, updateCartList} = this.props
    const {id} = cartItemDetails

    if (quantity > 1) {
      await this.setState(
        prevState => ({quantity: prevState.quantity - 1}),
        this.setLocalStorage,
      )
    } else {
      this.removeFromLocalStorage(quantity, id)
    }

    updateCartList()
  }

  onIncrement = async () => {
    const {updateCartList} = this.props
    await this.setState(
      prevState => ({quantity: prevState.quantity + 1}),
      this.setLocalStorage,
    )
    updateCartList()
  }

  render() {
    const {cartItemDetails} = this.props
    const {imageUrl, cost, name} = cartItemDetails
    const {quantity} = this.state
    return (
      <div className="cart-item" testid="cartItem">
        <img className="cart-item-image" src={imageUrl} alt="food-item" />
        <div className="cart-item-details-container">
          <h1 className="cart-item-name">{name}</h1>
          <div className="item-counter-container">
            <button
              testid="decrement-quantity"
              className="counter-button"
              type="button"
              onClick={this.onDecrement}
            >
              -
            </button>
            <p className="cart-item-count" testid="item-quantity">
              {quantity}
            </p>
            <button
              testid="increment-quantity"
              className="counter-button"
              type="button"
              onClick={this.onIncrement}
            >
              +
            </button>
          </div>
          <div className="cart-item-price cart-item-price-container">
            <p className="cart-item-price">₹</p>
            <p className="cart-item-price">{cost * quantity}</p>
            <p className="cart-item-price">.00</p>
          </div>
        </div>
      </div>
    )
  }
}

export default CartItem
