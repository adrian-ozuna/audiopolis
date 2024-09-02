import { FC, ReactNode } from 'react'

interface Props {
    hasBackground?: boolean
    icon: ReactNode
    onClick?: () => void
}

const PlayerButton: FC<Props> = ({hasBackground = false, icon, onClick}) => {
  return (
    <button className={`w-14 h-14 rounded-full ${hasBackground ? 'bg-black/70' : ''} flex items-center justify-center p-4 text-center  `} onClick={onClick}>
        {icon}
    </button>
  )
}

export default PlayerButton