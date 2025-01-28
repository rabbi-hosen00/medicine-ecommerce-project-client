/* eslint-disable react/jsx-no-undef */
import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import PlantDetails from '../pages/PlantDetails/PlantDetails'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'
// import AddPlant from '../pages/Dashboard/Seller/ManageMadicine'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers'
import Profile from '../pages/Dashboard/Common/Profile'
import Statistics from '../pages/Dashboard/Common/Statistics'
import MainLayout from '../layouts/MainLayout'

import MyOrders from '../pages/Dashboard/Customer/MyOrders'
import ManageMadicine from '../pages/Dashboard/Seller/ManageMadicine'
import Shop from '../pages/Shop/Shop'
import MyCard from '../pages/MyCart/MyCard'
import Checkout from '../pages/Payment/Checkout'
import Invoice from '../pages/Invoice/Invoice'
import MedicineCategoryShop from '../components/MedicineCategory/MedicineCategoryShop'
import SellerRoute from './SellerRoute'
import AdminRoute from './AdminRoute'
import PaymentHistory from '../pages/Dashboard/Seller/PaymentHistory'
import SellerStatistcis from '../components/Dashboard/Statistics/SellerStatistcis'
import ManageCategory from '../pages/Dashboard/Admin/ManageCategory'
import PaymentManagement from '../pages/Dashboard/Admin/PaymentManagement'
import SalesReport from '../pages/Dashboard/Admin/SalesReport'
export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/shop',
        element: <PrivateRoute><Shop /></PrivateRoute>
      },
      {
        path: "/invoice",
        element: <PrivateRoute><Invoice /></PrivateRoute>,
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
      {
        path: '/checkout/:id',
        element: <Checkout />,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/checkout/${params.id}`),
      },
      {
        path: '/category/:id',
        element: <MedicineCategoryShop></MedicineCategoryShop>,
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/category/${params.id}`),
      },
      {
        path: '/cart',
        element: <PrivateRoute><MyCard /></PrivateRoute>,
      },
      {
        path: '/plant/:id',
        element: <PlantDetails />,
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-medicine',
        element: (
          <PrivateRoute>
            <SellerRoute>
              <ManageMadicine />
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'payment-history',
        element: (
          <PrivateRoute>
            <SellerRoute>
              <PaymentHistory />
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-users',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-category',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageCategory />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'payment-management',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <PaymentManagement />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'sales-report',
        element: (
          <PrivateRoute>
            <AdminRoute>
               <SalesReport />
            </AdminRoute>
          </PrivateRoute>
        ),
      },

      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-orders',
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },

      {
        path: 'seller-home',
        element: (
          <PrivateRoute>
            <SellerRoute>
              <SellerStatistcis />
            </SellerRoute>
          </PrivateRoute>
        )
      },
    ],
  },
])
