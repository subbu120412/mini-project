import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import './restaurant.css'

const RestaurantItem = props => {
  const {restaurantDetails} = props

  const getAvailabilityStatus = opensAt => {
    const currentTime = new Date().getHours()
    const opensAtTime = opensAt.split(',')[0]
    const opensAtHours = Number(opensAtTime.slice(0, 2))

    if (opensAtHours <= currentTime) {
      return ['Currently Open, Closes At 12:00 AM', 'open-class']
    }
    return [`Opens at ${opensAt}`, 'close-class']
  }

  const {imageUrl, name, cuisine, id, userRating, opensAt} = restaurantDetails
  const {rating, totalReviews} = userRating
  const availableStatus = getAvailabilityStatus(opensAt)

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
          <p className={availableStatus[1]}>{availableStatus[0]}</p>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantItem
