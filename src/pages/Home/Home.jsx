import { Helmet } from 'react-helmet-async'
import Plants from '../../components/Home/Plants'
import Advertisemest from '../../components/Home/Advertisemest'

const Home = () => {
  return (
    <div>
      <Helmet>
        <title> PlantNet | Buy Your Desired Plant</title>
      </Helmet>
      <Advertisemest></Advertisemest>
      <Plants />
      
    </div>
  )
}

export default Home
