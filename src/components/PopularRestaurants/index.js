import {Component} from 'react'

import {GoSearch} from 'react-icons/go'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsFilterLeft} from 'react-icons/bs'
import {GrNext, GrPrevious} from 'react-icons/gr'
import './restaurants.css'
import RestaurantItem from '../RestaurantItem'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiStatusComponent = {
  initial: 'INITIAL',
  pending: 'PENDING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class PopularRestaurants extends Component {
  state = {
    searchInput: '',
    LIMIT: 9,
    sortFrom: sortByOptions[1].value,
    restaurantsList: [],
    apiStatus: apiStatusComponent.initial,
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
    this.setState({apiStatus: apiStatusComponent.pending})
    const {searchInput, LIMIT, sortFrom, activePageNumber} = this.state
    const offset = (activePageNumber - 1) * LIMIT
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
      this.setState({
        restaurantsList: updatedList,
        apiStatus: apiStatusComponent.success,
      })
    } else {
      this.setState({apiStatus: apiStatusComponent.failure})
    }
  }

  moveToNextPage = () => {
    const {LIMIT, restaurantsList} = this.state
    if (restaurantsList.length === LIMIT) {
      this.setState(
        prevState => ({activePageNumber: prevState.activePageNumber + 1}),
        this.getPopularRestaurants,
      )
    }
  }

  moveToPreviousPage = () => {
    const {activePageNumber} = this.state
    if (activePageNumber > 1) {
      this.setState(
        prevState => ({activePageNumber: prevState.activePageNumber - 1}),
        this.getPopularRestaurants,
      )
    }
  }

  onSortBy = event => {
    this.setState({sortFrom: event.target.value}, this.getPopularRestaurants)
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  searchRestaurant = event => {
    if (event.key === 'Enter' || event.type === 'click') {
      this.getPopularRestaurants()
    }
  }

  resetState = () => {
    this.setState(
      {
        searchInput: '',
        LIMIT: 9,
        sortFrom: sortByOptions[1].value,
        restaurantsList: [],
        apiStatus: apiStatusComponent.initial,
        activePageNumber: 1,
      },
      this.getPopularRestaurants,
    )
  }

  renderLoader = () => (
    <div testid="restaurants-list-loader" className="loader-container">
      <Loader type="Oval" color="#F7931E" height="40" width="40" />
    </div>
  )

  renderRestaurantsList = () => {
    const {
      restaurantsList,
      activePageNumber,
      sortFrom,
      searchInput,
    } = this.state

    return (
      <div className="list-container">
        <h1 className="popular-restaurants-heading">Popular Restaurants</h1>
        <div className="filters-description-container">
          <p className="popular-restaurants-description">
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>
          <div className="filter-container">
            <BsFilterLeft className="sorting-icon" />
            <p className="sort-by">Sort By</p>
            <select
              onChange={this.onSortBy}
              className="sorting-options"
              value={sortFrom}
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
          <div className="search-input-container">
            <input
              onChange={this.onSearchInput}
              value={searchInput}
              type="search"
              className="search-input"
              placeholder="Search"
              onKeyUp={this.searchRestaurant}
            />
            <button
              onClick={this.searchRestaurant}
              className="search-button"
              type="button"
            >
              <GoSearch />
            </button>
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

  renderFailure = () => (
    <div className="failure-container">
      <h1 className="failure-heading">Restaurant Not Found!</h1>

      <button
        onClick={this.resetState}
        type="button"
        className="try-again-button"
      >
        Try Another Restaurant
      </button>
    </div>
  )

  renderRestaurantPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusComponent.pending:
        return this.renderLoader()
      case apiStatusComponent.success:
        return this.renderRestaurantsList()
      case apiStatusComponent.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular-restaurants-container">
        {this.renderRestaurantPage()}
      </div>
    )
  }
}

export default PopularRestaurants
