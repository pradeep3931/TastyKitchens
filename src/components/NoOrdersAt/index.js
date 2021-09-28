import {Link} from 'react-router-dom'
import noOrderImg from '../Backgroundpics/OBJECTSnoOrder.jpg'
import './index.css'

const NoOrdersAt = () => (
  <div className="noorders-container">
    <img src={noOrderImg} alt="empty cart" className="no-orders-img" />
    <h1>No Order Yet!</h1>
    <p>Your cart is empty. Add something from the menu.</p>
    <Link to="/">
      <button type="button" className="noorder-ordernow-button">
        Order Now
      </button>
    </Link>
  </div>
)
export default NoOrdersAt
