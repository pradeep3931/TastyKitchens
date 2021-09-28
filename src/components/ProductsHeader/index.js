import {BsFilterRight} from 'react-icons/bs'

import './index.css'

const ProductsHeader = props => {
  const {activeOptionId, sortByOptions, changeSortby} = props
  const onChangeSortby = event => {
    changeSortby(event.target.value)
  }

  return (
    <div className="products-header">
      <div className="product-heading-container">
        <h1 className="products-list-heading">Popular Restaurants</h1>
        <p>
          Select Your favourite restaurant special dish and make your day
          happy...
        </p>
      </div>
      <div className="sort-by-container">
        <BsFilterRight className="sort-by-icon" />
        <p className="sort-by">Sort By</p>
        <select
          className="sort-by-select"
          value={activeOptionId}
          onChange={onChangeSortby}
        >
          {sortByOptions.map(each => (
            <option key={each.id} value={each.value} className="select-option">
              {each.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ProductsHeader
