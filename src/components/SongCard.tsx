import React, { FC } from 'react'

interface Props {
    title: string;
    duration: string;
    author: string;
}

const SongCard: FC<Props> = ({title, duration, author}) => {
    return (
        <div className="p-4 w-full bg-green-600/70 shadow-md hover:bg-green-700/90 rounded-lg text-white">
            <p className='truncate ...'>{title} - {author}</p>
        </div>
    )
}

export default SongCard