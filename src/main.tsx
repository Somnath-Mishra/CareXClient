import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage.tsx'
import Problem from './pages/Problem.tsx'
import Blog from './pages/Blog.tsx'
import Dashboard from './pages/Dashboard.tsx'
import HistoryPage from './pages/HistoryPage.tsx'
import Payment from './pages/Payment.tsx'
import Signup from './pages/Signup.tsx'
import Login from './pages/Login.tsx'
import LandingPageLayout from './pages/LandingPage.tsx'
import UserLayout from './pages/UserLayout.tsx'
import Home from './pages/Home.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import DoctorList from './pages/DoctorList.tsx'

const router = createBrowserRouter([

  {
    //This is for non-login or non-signup user
    //Basics landing page for user
    path: '/',
    element: <LandingPageLayout />,
    errorElement: <ErrorPage />,
    children:[
      {
        path:'signup',
        element:<Signup/>
      },
      {
        path:'login',
        element:<Login/>
      }
    ]
  },
  {
    path: 'user/:userId',
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index:true,
        path:'user/:userId',
        element:<Home/>
      },
      {
        path: 'problem',
        element: <Problem />,
      },
      {
        path: 'blog',
        element: <Blog />
      },
      {
        path:'dashboard',
        element:<Dashboard/>,
      },
      {
        path:'history',
        element:<HistoryPage/>
      },
      {
        path:'doctorList',
        element: <DoctorList/>
      },
      {
        path:'payment',
        element: <Payment/>
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
