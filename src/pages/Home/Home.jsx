import { Helmet } from 'react-helmet-async'
import Plants from '../../components/Home/Plants'
import Advertisemest from '../../components/Home/Advertisemest'
// import DiscountProduct from '../../components/Home/DiscountProduct'
import DiscountProduct from '../../components/Home/DiscountProduct'

const Home = () => {
  return (
    <div>
      <Helmet>
        <title> Medicine | Home page</title>
      </Helmet>
      <Advertisemest></Advertisemest>
      <Plants />
      <DiscountProduct></DiscountProduct>
    </div>
  )
}

export default Home;
