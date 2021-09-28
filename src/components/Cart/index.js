import ShowContext from '../../context/ShowContext'
import Header from '../Header'
import NoOrdersAt from '../NoOrdersAt'
import CartListView from '../CartListView'
import TotalAmount from '../totalAmount'
import './index.css'

const Cart = () => (
  <ShowContext.Consumer>
    {value => {
      const {cartList} = value
      const showEmptyView = cartList.length === 0
      return (
        <div>
          <Header />
          {showEmptyView ? (
            <NoOrdersAt />
          ) : (
            <div className="cart-list-container">
              <div className="Cart-list-titles">
                <p>Item</p>
                <p>Quantity</p>
                <p>price</p>
              </div>
              <CartListView />
              <hr />
              <TotalAmount />
            </div>
          )}
        </div>
      )
    }}
  </ShowContext.Consumer>
)
export default Cart
