import Header from '../Header'
import ReactSlider from '../Carousel'
import Restaurents from '../Restaurent'
import Footer from '../Footer'
import './index.css'

const HomeRoute = () => (
  <div className="home-container">
    <Header />
    <ReactSlider />
    <Restaurents />
    <Footer />
  </div>
)
export default HomeRoute
