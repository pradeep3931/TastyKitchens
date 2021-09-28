import {Link} from 'react-router-dom'
import Header from '../Header'
import NotFoundImg from '../Backgroundpics/Layer 1notfound.jpg'
import './index.css'

const NotFound = () => (
  <div>
    <Header />
    <div>
      <img src={NotFoundImg} alt="not found" />
      <h1>Page Not Found</h1>
      <p>
        we are sorry, the page you requested could not be found Please go back
        to the homepage
      </p>
      <Link to="/">
        <button type="button" className="notfound-button">
          Home Page
        </button>
      </Link>
    </div>
  </div>
)
export default NotFound
