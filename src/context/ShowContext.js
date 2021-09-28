import React from 'react'

const CartContext = React.createContext({
  isShow: false,
  cartList: [],
  addCartItem: () => {},
  onclickIsShow: () => {},
  onIncrementbtn: () => {},
  onDecrementbtn: () => {},
  removeCartItem: () => {},
})

export default CartContext
