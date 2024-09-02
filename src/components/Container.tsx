import React, { FC, ReactNode } from 'react'

interface Props {
    children: ReactNode
}

const Container: FC<Props> = ({children}) => {
  return (
    <div className='flex justify-center items-center mx-auto px-4 h-dvh'>
        {children}
    </div>
  )
}

export default Container