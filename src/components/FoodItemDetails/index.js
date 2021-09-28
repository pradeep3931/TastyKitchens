import {BiRupee} from 'react-icons/bi'
import {BsPlusSquare, BsDashSquare, BsFillStarFill} from 'react-icons/bs'

import './index.css'

const FoodItem = props => {
  const {
    FoodDetails,
    addItem,
    isShowCounter,
    onIncrementQuantity,
    onDecrementQuantity,
    quantity,
  } = props
  const {cost, id, imgUrl, name, rating} = FoodDetails
  console.log(isShowCounter)

  const onClickAdd = () => {
    addItem(id)
  }

  const onIncrementedQuantity = () => {
    onIncrementQuantity(id)
  }

  const onDecrementedQuantity = () => {
    onDecrementQuantity(id)
  }

  return (
    <li data-testid="foodItem" className="food-list-item-container">
      <img src={imgUrl} alt="foodItem" className="food-image-size" />
      <div className="food-item-details-view">
        <p className="food-title">{name}</p>
        <div className="rupee-name-rating-container">
          <BiRupee />
          <p className="cost-of-food">{cost}</p>
        </div>
        <div className="rupee-name-rating-container">
          <BsFillStarFill color="#FFCC00" />
          <p>{rating}</p>
        </div>
        {isShowCounter ? (
          <div className="quantity-container">
            <button
              type="button"
              className="quantity-controller-button"
              onClick={onDecrementedQuantity}
              testid="minus"
            >
              <BsDashSquare className="quantity-controller-icon" />
            </button>
            <p className="quantity">{quantity}</p>
            <button
              type="button"
              className="quantity-controller-button"
              onClick={onIncrementedQuantity}
              testid="plus"
            >
              <BsPlusSquare className="quantity-controller-icon" />
            </button>
          </div>
        ) : (
          <button type="button" className="add-button" onClick={onClickAdd}>
            Add
          </button>
        )}
      </div>
    </li>
  )
}
export default FoodItem
