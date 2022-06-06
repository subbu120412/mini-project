import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import FoodItem from '../FoodItem'
import './restaurant-details.css'

class RestaurantDetails extends Component {
  state = {isLoading: false, restaurantDetails: {}, foodItems: []}

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getConvertedData = data => ({
    costForTwo: data.cost_for_two,
    cuisine: data.cuisine,
    id: data.id,
    imageUrl: data.image_url,
    itemsCount: data.items_count,
    location: data.location,
    name: data.name,
    opensAt: data.opens_at,
    rating: data.rating,
    reviewsCount: data.reviews_count,
    cost: data.cost,
    foodType: data.food_type,
  })

  getRestaurantDetails = async () => {
    this.setState({isLoading: true})

    const token = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const convertedRestaurantData = this.getConvertedData(data)
      const convertedFoodItemsData = data.food_items.map(eachFoodItem =>
        this.getConvertedData(eachFoodItem),
      )

      this.setState({
        restaurantDetails: convertedRestaurantData,
        isLoading: false,
        foodItems: convertedFoodItemsData,
      })
    }
  }

  renderAboutRestaurant = () => {
    const {restaurantDetails, foodItems} = this.state

    const {
      imageUrl,
      cuisine,
      name,
      rating,
      reviewsCount,
      costForTwo,
      location,
    } = restaurantDetails

    return (
      <div className="restaurant-home">
        <div className="restaurant-about-container">
          <img
            className="restaurant-detail-image"
            src={imageUrl}
            alt="restaurant"
          />
          <div className="restaurant-info-container">
            <h1 className="name">{name}</h1>
            <p className="info-type">{cuisine}</p>
            <p className="info-type">{location}</p>
            <div className="rating-cost-container">
              <div className="info-container">
                <p className="info-rating">
                  <AiFillStar />
                  {rating}
                </p>
                <p className="info-type">{reviewsCount}+ Ratings</p>
              </div>
              <hr className="hr-1" />
              <div>
                <p className="info-rating">{costForTwo}</p>
                <p className="info-type">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
        <ul className="food-items-list">
          {foodItems.map(each => (
            <FoodItem foodItem={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div
      testid="restaurant-details-loader"
      className="restaurant-loader-container"
    >
      <Loader type="Oval" color="#F7931E" height="40" width="40" />
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <div className="restaurant-specific-details-container">
        <Header />
        {isLoading ? this.renderLoader() : this.renderAboutRestaurant()}

        <Footer />
      </div>
    )
  }
}

export default RestaurantDetails
