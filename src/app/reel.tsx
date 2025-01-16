"use client";
import React, { useRef, useEffect, useState } from "react";
import ReelControls from "./share/container";
import { tag } from "./reelContainer";
import Image from "next/image";

interface VideoReelProps {
  videoSrc: string;
  product: string;
  isVisible: boolean;
  tags: tag[];
}

const VideoReel: React.FC<VideoReelProps> = ({
  videoSrc,
  product,
  isVisible,
  tags,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    if (isVisible) {
      videoRef.current?.play();
      setIsPlaying(true);
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  }, [isVisible]);

//   const togglePlayPause = () => {
//     if (isPlaying) {
//       videoRef.current?.pause();
//     } else {
//       videoRef.current?.play();
//     }
//     setIsPlaying(!isPlaying);
//   };

  const toggleMute = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleMouseDown = () => {
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleMouseUp = () => {
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div
      className="w-full h-[100vh] flex flex-col justify-center items-center relative"
      onClick={toggleMute}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        className="w-auto max-w-[90%] md:max-w-[90%] lg:max-w-[90%] h-full object-cover"
        autoPlay
        muted={isMuted}
        loop
        playsInline
      />
      <div className="absolute top-2 right-2 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-full p-2">
        {isMuted ? (
          <span>
            <svg
              fill="#000000"
              width="30px"
              height="30px"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M542.86 294.4L362.3 430a10.72 10.72 0 0 0-2.71 3.25H255.53v153.2h104.06a10.58 10.58 0 0 0 2.71 3.25l180.56 135.52a10.83 10.83 0 0 0 17.34-8.66v-413.5a10.83 10.83 0 0 0-17.34-8.66zM742.6 599.41L765 577l-67.2-67.2 67.2-67.2-22.4-22.4-67.2 67.2-67.2-67.2-22.4 22.4 67.2 67.2-67.2 67.2 22.4 22.4 67.2-67.2 67.2 67.2z" />
            </svg>
          </span>
        ) : (
          <span>
            <svg
              fill="#000000"
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M11.553 3.064A.75.75 0 0112 3.75v16.5a.75.75 0 01-1.255.555L5.46 16H2.75A1.75 1.75 0 011 14.25v-4.5C1 8.784 1.784 8 2.75 8h2.71l5.285-4.805a.75.75 0 01.808-.13zM10.5 5.445l-4.245 3.86a.75.75 0 01-.505.195h-3a.25.25 0 00-.25.25v4.5c0 .138.112.25.25.25h3a.75.75 0 01.505.195l4.245 3.86V5.445z"
              />
              <path d="M18.718 4.222a.75.75 0 011.06 0c4.296 4.296 4.296 11.26 0 15.556a.75.75 0 01-1.06-1.06 9.5 9.5 0 000-13.436.75.75 0 010-1.06z" />
              <path d="M16.243 7.757a.75.75 0 10-1.061 1.061 4.5 4.5 0 010 6.364.75.75 0 001.06 1.06 6 6 0 000-8.485z" />
            </svg>
          </span>
        )}
      </div>
      <div
        className="absolute inset-0 flex items-center justify-center cursor-pointer bg-transparent"
        // onClick={togglePlayPause}
      >
        {!isPlaying && (
          <div className="text-white bg-black bg-opacity-50 rounded-full p-4">
            <Image
              src="https://img.icons8.com/ios-filled/50/play--v1.png"
              width="50"
              height="50"
              alt="play--v1"
            />
          </div>
        )}
      </div>
      {tags.map((tag, index: number) => (
        <a
          key={index}
          href={tag.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bg-white text-black text-sm px-2 py-1 rounded shadow hover:bg-gray-200"
          style={{
            bottom: `${tag.position.y}%`,
            right: `${tag.position.x}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          {tag.name}
        </a>
      ))}
      <div className="absolute bottom-8 left-8 bg-brown p-2 rounded">
        <span>{product}</span>
      </div>
      <ReelControls shareUrl={`https://example.com/reel/${product}`} />
    </div>
  );
};

export default VideoReel;
