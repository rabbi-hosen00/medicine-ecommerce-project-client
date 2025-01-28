import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { BsGraphUp } from 'react-icons/bs'
import { BiCategory } from 'react-icons/bi'
import { MdBusAlert, MdPayment } from 'react-icons/md'

const AdminMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsGraphUp}
        label='Admin Home'
        address='/dashboard'
      />
      <MenuItem
        icon={FaUserCog}
        label='Manage Users'
        address='manage-users'
      />

      <MenuItem
        icon={BiCategory}
        label='Manage Category'
        address='manage-category'
      />
      <MenuItem
        icon={MdPayment}
        label='Payment management'
        address='payment-management'
      />

      <MenuItem
        icon={MdBusAlert }
        label='Sales Report'
        address='sales-report'
      />

    </>
  )
}

export default AdminMenu
