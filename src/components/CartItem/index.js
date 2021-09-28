import {BiRupee} from 'react-icons/bi'
import Counter from '../Counter'
import CartContext from '../../context/ShowContext'
import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {onIncrementbtn, onDecrementbtn} = value
      const {cartData} = props
      const {id, imgUrl, name, quantity, cost} = cartData

      const totalcost = cost * quantity

      const onIncresedBtnClick = () => {
        onIncrementbtn(id)
      }
      const onDecreaseBtnClick = () => {
        onDecrementbtn(id)
      }

      return (
        <li className="Cart-item-food-list-container">
          <div className="cart-item-container">
            <img src={imgUrl} alt="foodItem" className="cart-food-item-image" />
            <p>{name}</p>
          </div>

          <div>
            <Counter
              quantity={quantity}
              onincresedBtnClick={onIncresedBtnClick}
              onDecreaseBtnClick={onDecreaseBtnClick}
            />
          </div>

          <div className="price-container">
            <BiRupee />
            <p data-testid="total-price">{totalcost}</p>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)
export default CartItem
