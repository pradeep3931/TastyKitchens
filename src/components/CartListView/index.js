import CartContext from '../../context/ShowContext'
import CartItem from '../CartItem'
import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      return (
        <ul className="cart-list-ul-element">
          {cartList.map(each => (
            <CartItem cartData={each} key={each.id} />
          ))}
        </ul>
      )
    }}
  </CartContext.Consumer>
)
export default CartListView
