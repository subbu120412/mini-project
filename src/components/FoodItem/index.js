import {AiFillStar} from 'react-icons/ai'
import {Component} from 'react'
import './fooditem.css'
import Counter from '../Counter'

class FoodItem extends Component {
  state = {showCounter: false}

  addToCart = () => {
    this.setState({showCounter: true})
  }

  showAddButton = () => {
    this.setState({showCounter: false})
  }

  render() {
    const {foodItem} = this.props
    const {showCounter} = this.state
    const {id, imageUrl, name, rating, cost} = foodItem
    return (
      <li className="food-item" testid="foodItem">
        <img className="food-item-image" src={imageUrl} alt="food-item" />
        <div className="food-item-details-container">
          <h1 className="food-item-name">{name}</h1>
          <div className="cost">
            <p className="cost">₹</p>
            <p className="cost">{cost}</p>
            <p className="cost">.00</p>
          </div>
          <p className="food-item-rating">
            <AiFillStar size="15" color="#FFCC00 " />
            {rating}
          </p>
          {showCounter ? (
            <Counter
              id={id}
              imageUrl={imageUrl}
              name={name}
              cost={cost}
              showAddButton={this.showAddButton}
            />
          ) : (
            <button
              onClick={this.addToCart}
              className="add-button"
              type="button"
            >
              Add
            </button>
          )}
        </div>
      </li>
    )
  }
}

export default FoodItem
