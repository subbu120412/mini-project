import {Switch, Route} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import RestaurantDetails from './components/RestaurantDetails'
import Payment from './components/PaymentPage'

import './App.css'

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

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute
      exact
      path="/"
      render={props => <Home sortByOptions={sortByOptions} {...props} />}
    />
    <ProtectedRoute
      exact
      path="/restaurant/:id"
      component={RestaurantDetails}
    />
    <ProtectedRoute exact path="/cart" component={Cart} />
    <ProtectedRoute exact path="/payment" component={Payment} />
    <Route component={NotFound} />
  </Switch>
)

export default App
