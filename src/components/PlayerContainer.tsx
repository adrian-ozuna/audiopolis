import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { ArrowLeftToLine, ArrowRightToLine, Pause, Play, Repeat, Shuffle, Volume2, VolumeOff } from 'lucide-react';
import SongCard from './SongCard';
import PlayerButton from './PlayerButton';

const PlayerContainer: FC = () => {
    const [isMuted, setIsMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [songs, setSongs] = useState<File[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(new Audio());

    useEffect(() => {
        const audio = audioRef.current;

        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        const handleLoadedMetadata = () => setDuration(audio.duration);

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.onended = handleNext;

        return () => {
            audio.pause();
            audio.src = '';
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.onended = null;
        };
    }, []);

    useEffect(() => {
        if (songs.length > 0) {
            const urlObject = URL.createObjectURL(songs[currentIndex]);
            audioRef.current.src = urlObject;
        }
    }, [currentIndex, songs]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying])

    const handleAddSong = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFile = e.target.files?.[0];
        if (newFile) {
            setSongs((prevSongs) => [...prevSongs, newFile]);
            if (songs.length === 0) setCurrentIndex(0);
        }
    };

    const handlePlayPause = () => {
        if (songs.length === 0) {
            alert("You haven't added any songs to play.");
            return;
        }

        if (!isPlaying) setCurrentIndex(0);
        setIsPlaying((prev) => !prev);
    };


    const handleNext = () => {
        if (songs.length > 0) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % songs.length);
            setIsPlaying(true);
        }
    };

    const handlePrev = () => {
        if (songs.length > 0) {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
            setIsPlaying(true);
        }
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            audioRef.current.currentTime = parseFloat(e.target.value);
        }
    };

    const handleMute = () => {
        setIsMuted(!isMuted)
        audioRef.current.muted = !isMuted;
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className='flex flex-col gap-y-6 w-25'>
            {songs.length > 0 && (
                <div className="isolate aspect-video w-96 rounded-xl bg-black/70 shadow-lg ring-1 ring-black/5 p-5 text-white flex flex-col gap-y-6 justify-between">
                    <div className='flex flex-col gap-y-4'>
                        <div className='flex flex-row justify-between items-center'>
                            <p className='font-bold text-xl'>{songs[currentIndex]?.name}</p>
                            <div onClick={handleMute}>
                                {isMuted ? <VolumeOff /> : <Volume2 />}
                            </div>
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <input
                                type="range"
                                className='w-full appearance-none bg-black/70 color-green-500 rounded-full'
                                value={currentTime}
                                max={duration}
                                onChange={handleSliderChange}
                            />
                            <div className="flex flex-row justify-between">
                                <p>{formatTime(currentTime)}</p>
                                <p>{formatTime(duration)}</p>
                            </div>
                        </div>

                        <div className='flex flex-row justify-between'>
                            <PlayerButton icon={<Shuffle className='text-white' />} />
                            <div className="flex flex-row gap-x-4">
                                <PlayerButton icon={<ArrowLeftToLine className='text-green-600' />} onClick={handlePrev} hasBackground={true} />
                                <PlayerButton
                                    icon={isPlaying ? <Pause className='text-green-600' /> : <Play className='text-green-600' />}
                                    onClick={handlePlayPause}
                                    hasBackground={true}
                                />
                                <PlayerButton icon={<ArrowRightToLine className='text-green-600' />} onClick={handleNext} hasBackground={true} />
                            </div>
                            <PlayerButton icon={<Repeat className='text-white' />} />
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-y-2">
                <input
                    type='file'
                    className='hidden'
                    id='track'
                    onChange={handleAddSong}
                    accept='audio/*'
                />
                <label htmlFor="track" className='p-4 bg-black text-white font-bold rounded-lg bg-black/70 hover:bg-black/80 mb-4'>
                    Add song
                </label>

                <div className='w-96'>
                    {songs.length > 0 && songs.map((song, index) => (
                        <SongCard key={index} title={song.name} duration={formatTime(duration)} author="" />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PlayerContainer;
