import React, { ReactNode } from 'react'

interface containerProps{
  children: ReactNode
}

function Container({children}:containerProps) {
  return (
    <div>
      {children}
    </div>
  )
}

export default Container
