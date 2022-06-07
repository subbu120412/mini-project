import {Switch, Route} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import RestaurantDetails from './components/RestaurantDetails'
import Payment from './components/PaymentPage'
import Profile from './components/Profile'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute
      exact
      path="/restaurant/:id"
      component={RestaurantDetails}
    />
    <ProtectedRoute exact path="/cart" component={Cart} />
    <ProtectedRoute exact path="/payment" component={Payment} />
    <ProtectedRoute exact path="/profile" component={Profile} />
    <Route component={NotFound} />
  </Switch>
)

export default App
