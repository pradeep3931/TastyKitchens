import {BsFillStarFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import './index.css'

const RestaurentItem = props => {
  const {list} = props
  const {id, imgUrl, name, cuisine, userRating} = list
  const {rating} = userRating
  return (
    <Link to={`/restaurant/${id}`} className="restaurant-item-nav-link">
      <li className="Restaurant-list-item" data-testid="restaurant-item">
        <div className="restaurant-details">
          <img
            src={imgUrl}
            alt="restaurant"
            className="restaurant-image-width"
          />
          <div className="restaurant-description">
            <p className="restaurant-name">{name}</p>
            <p className="cuisine-type">{cuisine}</p>
            <div className="rating">
              <BsFillStarFill color="#F7931E" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default RestaurentItem
