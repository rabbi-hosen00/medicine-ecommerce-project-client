import { Helmet } from 'react-helmet-async'
import AdminStatistics from '../../../components/Dashboard/Statistics/AdminStatistics'
import useRole from '../../../hooks/useRole'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import { Navigate } from 'react-router-dom'
import SellerStatistcis from '../../../components/Dashboard/Statistics/SellerStatistcis'
const Statistics = () => {
  const [role, isLoading] = useRole()
  if (isLoading) return <LoadingSpinner></LoadingSpinner>
  if(role === 'customer') return <Navigate to='/dashboard/my-orders' />
  if(role === 'seller') return <Navigate to='/dashboard/payment-history' />

  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      {role === "admin" && <AdminStatistics />}
      {role === "seller" && <SellerStatistcis />}

    </div>
  )
}

export default Statistics


