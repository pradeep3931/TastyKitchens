import {Link} from 'react-router-dom'
import Header from '../Header'
import SuccesImg from '../Backgroundpics/Vector (1).jpg'
import './index.css'

const PlaceOrder = () => (
  <div>
    <Header />
    <div className="place-order-container">
      <img src={SuccesImg} alt="success" />
      <h1>Payment Successful</h1>
      <p>Thank you for ordering Your payment is successfully completed.</p>
      <Link to="/">
        <button type="button" className="payment-success-btn">
          Go To Home Page
        </button>
      </Link>
    </div>
  </div>
)
export default PlaceOrder
