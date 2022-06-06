import {Component} from 'react'

import './index.css'

class Counter extends Component {
  state = {foodItemCount: 1}

  componentDidMount() {
    this.setLocalStorage()
  }

  getLocalStorage = () => {
    const stringifiedCartItemsList = localStorage.getItem('cartData')
    if (stringifiedCartItemsList === null) {
      return []
    }
    return JSON.parse(stringifiedCartItemsList)
  }

  setLocalStorage = () => {
    const {foodItemCount} = this.state
    const {imageUrl, name, id, cost} = this.props
    const cartList = this.getLocalStorage()
    const getExistedItem = cartList.find(eachItem => eachItem.id === id)

    if (getExistedItem === undefined) {
      const cartItemDetails = {
        imageUrl,
        name,
        quantity: foodItemCount,
        id,
        cost,
      }
      cartList.push(cartItemDetails)
      localStorage.setItem('cartData', JSON.stringify(cartList))
    } else {
      const updatedCartList = cartList.map(eachItem => {
        if (eachItem.id === id) {
          return {
            ...eachItem,
            quantity: eachItem.quantity + 1,
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

  onDecrement = () => {
    const {foodItemCount} = this.state
    const {showAddButton, id} = this.props
    if (foodItemCount > 1) {
      this.setState(
        prevState => ({foodItemCount: prevState.foodItemCount - 1}),
        this.setLocalStorage,
      )
    } else {
      this.removeFromLocalStorage(foodItemCount, id)
      showAddButton()
    }
  }

  onIncrement = () => {
    this.setState(
      prevState => ({foodItemCount: prevState.foodItemCount + 1}),
      this.setLocalStorage,
    )
  }

  render() {
    const {foodItemCount} = this.state
    return (
      <div className="counter-container">
        <button
          testid="decrement-count"
          className="counter-button"
          type="button"
          onClick={this.onDecrement}
        >
          -
        </button>
        <div className="food-item-count" testid="active-count">
          {foodItemCount}
        </div>
        <button
          testid="increment-count"
          className="counter-button"
          type="button"
          onClick={this.onIncrement}
        >
          +
        </button>
      </div>
    )
  }
}

export default Counter
