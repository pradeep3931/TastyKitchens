import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

export default class ReactSlider extends Component {
  state = {
    imageList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getImageData()
  }

  getImageData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const fetchedData = await response.json()
    const updatedData = fetchedData.offers.map(each => ({
      id: each.id,
      imgUrl: each.image_url,
    }))
    this.setState({imageList: updatedData, isLoading: false})
  }

  renderLoadingView = () => (
    <div
      data-testid="restaurants-offers-loader"
      className="products-loader-container"
    >
      <Loader type="TailSpin" color="#0b69ff" height="50" width="50" />
    </div>
  )

  render() {
    const settings = {
      dots: true,
    }
    const {imageList, isLoading} = this.state

    return (
      <div className="container">
        {isLoading ? (
          this.renderLoadingView()
        ) : (
          <Slider {...settings}>
            {imageList.map(each => (
              <div key={each.id}>
                <img
                  src={each.imgUrl}
                  alt="offer"
                  className="slider-image-width"
                />
              </div>
            ))}
          </Slider>
        )}
      </div>
    )
  }
}
