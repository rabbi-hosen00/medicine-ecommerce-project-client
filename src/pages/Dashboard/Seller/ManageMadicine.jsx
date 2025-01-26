import { Helmet } from 'react-helmet-async'
import MadicineForm from '../../../components/Form/MadicineForm'
import AllMedicine from './AllMedicine'

// import CategorisForm from '../../../components/Form/CategorisForm'

const ManageMadicine = () => {


  return (
    <div>
      <Helmet>
        <title>Manage medicine | Dashboard</title>
      </Helmet>
     
     <AllMedicine></AllMedicine>
      
      {/* Form */}
      {/* <CategorisForm></CategorisForm> */}
      <MadicineForm></MadicineForm>

    </div>
  )
}

export default ManageMadicine
