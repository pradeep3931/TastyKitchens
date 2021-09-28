import {Component} from 'react'
import Cookies from 'js-cookie'
import {BiRupee} from 'react-icons/bi'
import {BsFillStarFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import {Redirect} from 'react-router-dom'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'
import FoodItem from '../FoodItemDetails'
import Footer from '../Footer'
import ShowContext from '../../context/ShowContext'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

export default class RestaurantDetails extends Component {
  state = {
    restaurantdetails: [],
    FoodDetails: [],
    apiStatus: apiStatusConstants.initial,
    quantity: 0,
  }

  componentDidMount() {
    this.getRestaurantData()
  }

  getFormattedData = data => ({
    costOfTwo: data.cost_for_two,
    cuisine: data.cuisine,
    id: data.id,
    imageUrl: data.image_url,
    itemsCount: data.items_count,
    location: data.location,
    name: data.name,
    opensAt: data.opens_at,
    rating: data.rating,
    reviewsCount: data.reviews_count,
  })

  getRestaurantData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = this.getFormattedData(fetchedData)
      const productList = fetchedData.food_items.map(each => ({
        cost: each.cost,
        foodType: each.food_type,
        id: each.id,
        imgUrl: each.image_url,
        name: each.name,
        rating: each.rating,
      }))
      this.setState({
        restaurantdetails: updatedData,
        FoodDetails: productList,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 404) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onDecrementQuantity = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  onIncrementQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  renderLoadingView = () => (
    <div
      className="products-details-loader-container"
      data-testid="restaurant-details-loader"
    >
      <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderRestaurantView = () => (
    <ShowContext.Consumer>
      {value => {
        const {restaurantdetails, quantity, FoodDetails} = this.state
        const {
          costOfTwo,
          cuisine,
          imageUrl,
          location,
          name,
          rating,
          reviewsCount,
        } = restaurantdetails
        const {addCartItem, onIncrementbtn, onDecrementbtn} = value

        const onClickAddItemToCart = id => {
          const foodItem = FoodDetails.filter(each => each.id === id)
          const updatedQuantity = quantity + 1
          localStorage.setItem('cardData', {...foodItem[0], updatedQuantity})
          addCartItem({...foodItem[0], quantity})
        }
        return (
          <div>
            <div className="restaurent-back-image">
              <img
                src={imageUrl}
                alt="restaurant"
                className="restaurant-image-size"
              />
              <div className="restaurant-details-view">
                <h1>{name}</h1>
                <p>{cuisine}</p>
                <p>{location}</p>
                <div className="rating-cost-container">
                  <div>
                    <div className="icon-flex-row">
                      <BsFillStarFill />
                      <p>{rating}</p>
                    </div>
                    <p>{reviewsCount} + Ratings</p>
                  </div>
                  <div className="vl"> </div>
                  <div>
                    <div className="icon-flex-row">
                      <BiRupee />
                      <p>{costOfTwo}</p>
                    </div>
                    <p>Cost for two</p>
                  </div>
                </div>
              </div>
            </div>
            <ul className="food-list-container-element">
              {FoodDetails.map(eachItem => (
                <FoodItem
                  FoodDetails={eachItem}
                  key={eachItem.id}
                  addItem={onClickAddItemToCart}
                  isShowCounter={quantity === 1}
                  onDecrementQuantity={this.onDecrementQuantity}
                  quantity={quantity}
                  onIncrementQuantity={this.onIncrementQuantity}
                />
              ))}
            </ul>
            <Footer />
          </div>
        )
      }}
    </ShowContext.Consumer>
  )

  renderFailureView = () => <Redirect to="/" />

  renderProductDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurantView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderProductDetails()}
      </div>
    )
  }
}
