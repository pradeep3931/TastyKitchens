import {Link, withRouter} from 'react-router-dom'
import Cookie from 'js-cookie'
import {ImMenu} from 'react-icons/im'
import CartContext from '../../context/ShowContext'
import myImage from '../Backgroundpics/Vector.png'

import './index.css'

const Header = props => (
  <CartContext.Consumer>
    {value => {
      const {isShow, cartList, onClickShow} = value
      const cartItemsCount = cartList.length
      const isShowMenu = () => {
        onClickShow(!isShow)
      }
      const onClickLogout = () => {
        Cookie.remove('jwt_token')
        const {history} = props
        history.replace('/login')
      }
      const renderCartItemsCount = () => (
        <>
          {cartItemsCount > 0 ? (
            <span data-testid="active-count" className="cart-count-badge">
              {cartList.length}
            </span>
          ) : null}
        </>
      )
      const className = isShow ? 'ShowItems' : 'collapseItem'
      return (
        <div>
          <div className="nav-bar-desktop-view">
            <Link to="/" className="nav-link ">
              <img src={myImage} alt="website logo" />
              <p className="nav-header">Tasty Kitchens</p>
            </Link>
            <div className="nav-buttons-link">
              <Link to="/" className="nav-link">
                <p>Home</p>
              </Link>
              <Link to="/cart" className="nav-link">
                <div className="nav-link-item">
                  <p>Cart</p>
                  {renderCartItemsCount()}
                </div>
              </Link>
            </div>
            <button
              type="button"
              className="logout-button"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </div>
          <div className="nav-bar-mobile-view">
            <div className="mobile-view-container">
              <Link to="/" className="nav-link ">
                <img src={myImage} alt="website logo" />
                <p className="nav-header">Tasty Kitchens</p>
              </Link>
              <button
                type="button"
                className="nav-collapse-button"
                onClick={isShowMenu}
              >
                <ImMenu />
              </button>
            </div>
            <div className={className}>
              <ul>
                <Link to="/" className="nav-link">
                  <li>Home</li>
                </Link>
                <Link to="/cart" className="nav-link">
                  <li>Cart</li>
                </Link>
              </ul>
              <button
                type="button"
                className="logout-button"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default withRouter(Header)
