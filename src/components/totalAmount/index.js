import {Link} from 'react-router-dom'
import {BiRupee} from 'react-icons/bi'
import CartContext from '../../context/ShowContext'

import './index.css'

const TotalAmount = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      cartList.forEach(eachCartItem => {
        total += eachCartItem.cost * eachCartItem.quantity
      })

      return (
        <div className="total-amount-container">
          <div>
            <h1 className="order-total-value">Order Total</h1>
          </div>
          <div>
            <h1>
              <span className="order-total-label">
                <BiRupee />
                Rs {total}
                /-
              </span>
            </h1>
            <Link to="/success">
              <button type="button" className="placeOrder-button d-sm-none">
                PlaceOrder
              </button>
            </Link>
            <Link to="/success">
              <button type="button" className="placeOrder-button d-lg-none">
                PlaceOrder
              </button>
            </Link>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default TotalAmount
