import React from 'react'
import { Outlet } from 'react-router-dom'

function Dashboard() {
  return (
    <div>
      this is user dash board
      <Outlet/>
    </div>
  )
}

export default Dashboard
