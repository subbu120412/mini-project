import {Component} from 'react'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './offers.css'

class Offers extends Component {
  state = {offersList: [], isLoading: false}

  componentDidMount() {
    this.getOffers()
  }

  getOffers = async () => {
    this.setState({isLoading: true})
    const token = Cookies.get('jwt_token')
    const offersUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(offersUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedList = data.offers.map(eachOffer => ({
        id: eachOffer.id,
        imageUrl: eachOffer.image_url,
      }))
      this.setState({offersList: updatedList, isLoading: false})
    }
  }

  renderLoader = () => (
    <div testid="restaurants-offers-loader" className="loader-container">
      <Loader
        testid="restaurants-offers-loader"
        type="Oval"
        color="#F7931E"
        height="40"
        width="40"
      />
    </div>
  )

  renderOffersSlider = () => {
    const {offersList} = this.state
    const settings = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
    }
    return (
      <Slider {...settings}>
        {offersList.map(eachOffer => (
          <li className="sliding-container" key={eachOffer.id}>
            <img className="offer-image" src={eachOffer.imageUrl} alt="offer" />
          </li>
        ))}
      </Slider>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div>{isLoading ? this.renderLoader() : this.renderOffersSlider()}</div>
    )
  }
}

export default Offers
