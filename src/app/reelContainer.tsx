'use client'
import React, { useState, useEffect, useRef } from 'react';
import VideoReel from './reel';

export interface tag {
    name: string,
    url: string,
    position: any
};

interface Reel {
  id: number;
  videoSrc: string;
  product: string;
  tags: tag[]
};

const ReelPage: React.FC = () => {
  const reels: Reel[] = [
    { id: 1, videoSrc: '/videos/sample.mp4', product: 'Aryan',
        tags: [
            { name: "Product xxx", url: "https://example.com/product1", position: { x: 2, y: 2 } },
          ],
     },
    { id: 2, videoSrc: '/videos/sample.mp4', product: 'Mayank',
        tags: [
            { name: "Product yyy", url: "https://example.com/product2", position: { x: 2, y: 2 } },
          ],
     },
    { id: 3, videoSrc: '/videos/sample.mp4', product: 'Sheila',
        tags: [
            { name: "Product zzz", url: "https://example.com/product3", position: { x: 2, y: 2 } },
          ],
     },
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
            tags={reel.tags}
          />
        </div>
      ))}
    </div>
  );
};

export default ReelPage;
