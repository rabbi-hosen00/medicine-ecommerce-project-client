import { BsFillHouseAddFill } from 'react-icons/bs'
import {  MdHomeWork, MdOutlineHome,  } from 'react-icons/md'
import MenuItem from './MenuItem'
const SellerMenu = () => {
  return (
    <>
      <MenuItem
        icon={MdOutlineHome}
        label='Seller Home'
        address='seller-home'
      />
      <MenuItem
        icon={BsFillHouseAddFill}
        label='manage medicine'
        // address='add-plant'
        address='manage-medicine'
      />
      <MenuItem
        icon={MdHomeWork}
        label='Payment history'
        address='payment-history'
      />
      
     

    </>
  )
}

export default SellerMenu



