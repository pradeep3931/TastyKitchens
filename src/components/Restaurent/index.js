import {Component} from 'react'
import Cookies from 'js-cookie'
import {BiChevronRightSquare, BiChevronLeftSquare} from 'react-icons/bi'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import RestaurantItem from '../RestaurentItem'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

export default class Restaurents extends Component {
  state = {
    restaurantList: [],
    apiStatus: apiStatusConstants.initial,
    activeoptId: sortByOptions[1].value,
    offset: 0,
    limit: 9,
    count: 1,
  }

  componentDidMount() {
    this.getRestuarents()
  }

  onDecreasePageno = () => {
    const {count, limit} = this.state
    if (count > 1) {
      this.setState(
        {count: count - 1, offset: (count - 1) * limit},
        this.getRestuarents,
      )
    }
  }

  onIncreasePageno = () => {
    const {count, limit} = this.state
    if (count < 20) {
      this.setState(
        {count: count + 1, offset: (count - 1) * limit},
        this.getRestuarents,
      )
    }
  }

  getRestuarents = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {activeoptId, offset, limit} = this.state
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${activeoptId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.restaurants.map(each => ({
        costOfTwo: each.cost_for_two,
        cuisine: each.cuisine,
        groupByTime: each.group_by_time,
        hasOnlineDelivery: each.has_online_delivery,
        hasTableBooking: each.has_table_booking,
        id: each.id,
        imgUrl: each.image_url,
        isDeliveringNow: each.is_delivering_now,
        location: each.location,
        menuType: each.menu_type,
        name: each.name,
        opensAt: each.opens_at,
        userRating: each.user_rating,
      }))
      this.setState({
        restaurantList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  changeSortBy = activeoptId => {
    this.setState({activeoptId}, this.getRestuarents)
  }

  renderRestaurentListView = () => {
    const {count, restaurantList, activeoptId} = this.state
    return (
      <div>
        <ProductsHeader
          activeOptionId={activeoptId}
          sortByOptions={sortByOptions}
          changeSortby={this.changeSortBy}
        />
        <hr />
        <ul className="restaurants-list">
          {restaurantList.map(eachItem => (
            <RestaurantItem list={eachItem} key={eachItem.id} />
          ))}
        </ul>
        <div className="page-indicator">
          <button
            type="button"
            onClick={this.onDecreasePageno}
            data-testid="pagination-left-button"
          >
            <BiChevronLeftSquare size={20} />
          </button>
          <p data-testid="active-page-number">{count} of 20</p>
          <button
            type="button"
            onClick={this.onIncreasePageno}
            data-testid="pagination-right-button"
          >
            <BiChevronRightSquare size={20} />
          </button>
        </div>
      </div>
    )
  }

  renderLoadingView = () => (
    <div
      data-testid="restaurants-list-loader"
      className="products-loader-container"
    >
      <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderAllRestaurants = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRestaurentListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div className="home-background">{this.renderAllRestaurants()}</div>
  }
}
