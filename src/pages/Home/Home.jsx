import { Helmet } from 'react-helmet-async'

import Advertisemest from '../../components/Home/Advertisemest'
// import DiscountProduct from '../../components/Home/DiscountProduct'
import DiscountProduct from '../../components/Home/DiscountProduct'
import CategoryMedicine from '../../components/Home/CategoryMedicine'
import QuerySupport from '../../components/Home/QuerySupport'
import CustomerReviews from '../../components/Home/CustomerReviews'

const Home = () => {
  return (
    <div>
      <Helmet>
        <title> Medicine | Home page</title>
      </Helmet>
      <Advertisemest></Advertisemest>
     
      <DiscountProduct></DiscountProduct>
      <CategoryMedicine></CategoryMedicine>
      <CustomerReviews></CustomerReviews>
      <QuerySupport></QuerySupport>
    </div>
  )
}

export default Home;
