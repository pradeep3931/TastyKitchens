import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import LoginForm from './components/Login'
import HomeRoute from './components/HomeRoute'
import CartContext from './context/ShowContext'
import ProtectedRoute from './components/ProtectedRoute'
import RestaurantDetails from './components/RestarantDetails'
import NotFound from './components/NotFound'
import Cart from './components/Cart'
import PlaceOrder from './components/Placeorder'

class App extends Component {
  state = {
    isShow: false,
    cartList: [],
  }

  onClickShow = show => {
    this.setState({isShow: show})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const productObject = cartList.find(
      eachCartItem => eachCartItem.id === product.id,
    )
    if (productObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (productObject.id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity + product.quantity

            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    } else {
      const updatedCartList = [...cartList, product]
      this.setState({cartList: updatedCartList})
    }
  }

  onIncrementbtn = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartItem => {
        if (id === eachCartItem.id) {
          const updatedQuantity = eachCartItem.quantity + 1
          return {...eachCartItem, quantity: updatedQuantity}
        }
        return eachCartItem
      }),
    }))
  }

  onDecrementbtn = id => {
    console.log(id)
    const {cartList} = this.state
    const productObject = cartList.find(eachCartItem => eachCartItem.id === id)
    if (productObject.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity - 1
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      eachCartItem => eachCartItem.id !== id,
    )
    this.setState({cartList: updatedCartList})
  }

  render() {
    const {isShow, cartList} = this.state
    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            isShow,
            cartList,
            onClickShow: this.onClickShow,
            addCartItem: this.addCartItem,
            onIncrementbtn: this.onIncrementbtn,
            onDecrementbtn: this.onDecrementbtn,
            removeCartItem: this.removeCartItem,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={HomeRoute} />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <ProtectedRoute
              exact
              path="/restaurant/:id"
              component={RestaurantDetails}
            />
            <ProtectedRoute exact path="/success" component={PlaceOrder} />
            <Route exact path="/bad-path" component={NotFound} />
            <Redirect to="bad-path" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
