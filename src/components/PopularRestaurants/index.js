import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {MdSort} from 'react-icons/md'
import {GrNext, GrPrevious} from 'react-icons/gr'
import './restaurants.css'
import RestaurantItem from '../RestaurantItem'

class PopularRestaurants extends Component {
  state = {
    searchInput: '',
    offset: 0,
    LIMIT: 9,
    sortFrom: 'Highest',
    restaurantsList: [],
    isLoading: false,
    activePageNumber: 1,
  }

  componentDidMount() {
    this.getPopularRestaurants()
  }

  convertIntoPascalCase = snakeCaseList => {
    const list = snakeCaseList.map(eachItem => ({
      costForTwo: eachItem.cost_for_two,
      cuisine: eachItem.cuisine,
      groupByTime: eachItem.group_by_time,
      hasOnlineDelivery: eachItem.has_online_delivery,
      hasTableBooking: eachItem.has_table_booking,
      id: eachItem.id,
      imageUrl: eachItem.image_url,
      isDeliveringNow: eachItem.is_delivering_now,
      location: eachItem.location,
      menuType: eachItem.menu_type,
      name: eachItem.name,
      opensAt: eachItem.opens_at,
      userRating: {
        rating: eachItem.user_rating.rating,
        ratingColor: eachItem.user_rating.rating_color,
        ratingText: eachItem.user_rating.rating_text,
        totalReviews: eachItem.user_rating.total_reviews,
      },
    }))
    return list
  }

  getPopularRestaurants = async () => {
    this.setState({isLoading: true})
    const {searchInput, offset, LIMIT, sortFrom} = this.state
    const token = Cookies.get('jwt_token')
    // const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}`
    const apiUrl = `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${offset}&limit=${LIMIT}&sort_by_rating=${sortFrom}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedList = this.convertIntoPascalCase(data.restaurants)
      this.setState({restaurantsList: updatedList, isLoading: false})
    }
  }

  moveToNextPage = () => {
    const {activePageNumber, LIMIT, restaurantsList} = this.state
    if (restaurantsList.length === LIMIT) {
      const newActivePage = activePageNumber + 1
      const newOffset = (newActivePage - 1) * LIMIT

      this.setState(
        {activePageNumber: newActivePage, offset: newOffset},
        this.getPopularRestaurants,
      )
    }
  }

  moveToPreviousPage = () => {
    const {activePageNumber, LIMIT} = this.state
    if (activePageNumber > 1) {
      const newActivePage = activePageNumber - 1
      const newOffset = (newActivePage - 1) * LIMIT
      this.setState(
        {activePageNumber: newActivePage, offset: newOffset},
        this.getPopularRestaurants,
      )
    }
  }

  onSortBy = event => {
    this.setState({sortFrom: event.target.value}, this.getPopularRestaurants)
  }

  renderLoader = () => (
    <div testid="restaurants-list-loader" className="loader-container">
      <Loader
        type="Oval"
        color="#F7931E"
        height="40"
        width="40"
      />
    </div>
  )

  renderRestaurantsList = () => {
    const {restaurantsList, activePageNumber} = this.state
    const {sortByOptions} = this.props
    return (
      <div className="list-container">
        <h1 className="popular-restaurants-heading">Popular Restaurants</h1>
        <div className="filters-description-container">
          <p className="popular-restaurants-description">
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>
          <div className="filter-container">
            <MdSort className="sorting-icon" />
            <p className="sort-by">Sort By</p>
            <select
              onChange={this.onSortBy}
              className="sorting-options"
              defaultValue="Lowest"
            >
              {sortByOptions.map(eachOption => (
                <option
                  className="sort-option"
                  value={eachOption.value}
                  key={eachOption.id}
                >
                  {eachOption.displayText}
                </option>
              ))}
            </select>
          </div>
        </div>
        <hr className="hr" />
        <ul className="restaurants-list">
          {restaurantsList.map(eachItem => (
            <RestaurantItem key={eachItem.id} restaurantDetails={eachItem} />
          ))}
        </ul>
        <div className="pagination-container">
          <button
            onClick={this.moveToPreviousPage}
            className="pagination-button"
            testid="pagination-left-button"
            type="button"
          >
            <GrPrevious />
          </button>
          <div className="active-page-status-container">
            <p className="page-text">
              <span testid="active-page-number">{activePageNumber}</span> of 4.
            </p>
          </div>
          <button
            onClick={this.moveToNextPage}
            className="pagination-button"
            testid="pagination-right-button"
            type="button"
          >
            <GrNext />
          </button>
        </div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="popular-restaurants-container">
        {isLoading ? this.renderLoader() : this.renderRestaurantsList()}
      </div>
    )
  }
}

export default PopularRestaurants
