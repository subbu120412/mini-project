import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import './restaurant.css'

const RestaurantItem = props => {
  const {restaurantDetails} = props

  const {imageUrl, name, cuisine, id, userRating} = restaurantDetails
  const {rating, totalReviews} = userRating
  return (
    <Link className="link" to={`/restaurant/${id}`}>
      <li className="restaurant-item" testid="restaurant-item">
        <img className="restaurant-image" src={imageUrl} alt="restaurant" />
        <div className="restaurant-details-container">
          <h1 className="restaurant-name">{name}</h1>
          <p className="cuisine">{cuisine}</p>
          <div className="rating-container">
            <AiFillStar size="12" color="#FFCC00 " />
            <p className="rating">{rating}</p>
            <h1 className="ratings">({totalReviews} ratings)</h1>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantItem
