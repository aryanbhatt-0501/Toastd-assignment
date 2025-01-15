'use client'
import React, { useState, useEffect, useRef } from 'react';
import VideoReel from './reel';

interface Reel {
  id: number;
  videoSrc: string;
  product: string;
}

const ReelPage: React.FC = () => {
  const reels: Reel[] = [
    { id: 1, videoSrc: '/videos/video1.mp4', product: 'Product A' },
    { id: 2, videoSrc: '/videos/video2.mp4', product: 'Product B' },
    { id: 3, videoSrc: '/videos/video3.mp4', product: 'Product C' },
  ];

  const [visibleReel, setVisibleReel] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const reelId = parseInt(entry.target.getAttribute('data-id') || '0');
          if (entry.isIntersecting) {
            setVisibleReel(reelId);
          }
        });
      },
      { threshold: 0.75 }
    );

    const container = containerRef.current;
    if (container) {
      Array.from(container.children).forEach((child) => observer.observe(child));
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col items-center overflow-y-scroll h-screen bg-gray-900">
      {reels.map((reel) => (
        <div key={reel.id} data-id={reel.id}>
          <VideoReel
            videoSrc={reel.videoSrc}
            product={reel.product}
            isVisible={visibleReel === reel.id}
          />
        </div>
      ))}
    </div>
  );
};

export default ReelPage;
