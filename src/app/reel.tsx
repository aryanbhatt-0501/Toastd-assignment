'use client'
import React, { useRef, useEffect, useState } from 'react';
import ReelControls from './share/container';

interface VideoReelProps {
  videoSrc: string;
  product: string;
  isVisible: boolean;
}

const VideoReel: React.FC<VideoReelProps> = ({ videoSrc, product, isVisible }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    if (isVisible) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [isVisible]);

  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center relative">
      <video
        ref={videoRef}
        src={videoSrc}
        className="w-auto max-w-[90%] md:max-w-[90%] lg:max-w-[90%] h-full object-cover"
        muted
        loop
        playsInline
      />
      <div className="absolute bottom-8 left-8 bg-brown p-2 rounded">
        <span>{product}</span>
      </div>
      <button
        onClick={togglePlayPause}
        className="absolute top-8 left-8 bg-gray-800 text-white px-4 py-2 rounded"
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <ReelControls shareUrl={`https://example.com/reel/${product}`} />
    </div>
  );
};

export default VideoReel;
