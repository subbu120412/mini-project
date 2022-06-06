import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './home.css'
import Header from '../Header'
import Offers from '../Offers'
import PopularRestaurants from '../PopularRestaurants'
import Footer from '../Footer'

const Home = props => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/login" />
  }
  const {sortByOptions} = props
  return (
    <div className="home">
      <Header />
      <div className="home-body">
        <Offers />
        <PopularRestaurants sortByOptions={sortByOptions} />
      </div>
      <Footer />
    </div>
  )
}
export default Home
