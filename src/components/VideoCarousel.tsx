
import React, { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Video {
  id: string;
  url: string;
  thumbnail: string;
  label?: 'Top Choice' | 'New' | 'Mixed' | 'Collection';
}

const videos: Video[] = [
  {
    id: '1',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'public/lovable-uploads/2a48033f-11a4-44cc-8b8b-31ed013ea791.png',
    label: 'Top Choice',
  },
  {
    id: '2',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'public/lovable-uploads/2a48033f-11a4-44cc-8b8b-31ed013ea791.png',
    label: 'New',
  },
  {
    id: '3',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'public/lovable-uploads/2a48033f-11a4-44cc-8b8b-31ed013ea791.png',
    label: 'Mixed',
  },
  {
    id: '4',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: 'public/lovable-uploads/2a48033f-11a4-44cc-8b8b-31ed013ea791.png',
    label: 'Collection',
  },
];

const VideoCarousel = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const playCurrentVideo = () => {
      videoRefs.current.forEach((videoRef, index) => {
        if (videoRef) {
          if (index === currentVideoIndex) {
            videoRef.play().catch(() => {
              console.log('Video play failed');
            });
          } else {
            videoRef.pause();
            videoRef.currentTime = 0;
          }
        }
      });
    };

    playCurrentVideo();

    const timer = setTimeout(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentVideoIndex]);

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className={cn(
              "relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300",
              "hover:ring-2 hover:ring-purple-500",
              index === currentVideoIndex && "ring-2 ring-purple-500 scale-105"
            )}
            onClick={() => setCurrentVideoIndex(index)}
          >
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              className="w-full h-[200px] object-cover"
              src={video.url}
              muted
              playsInline
              loop
            />
            {video.label && (
              <Badge
                className="absolute top-2 right-2 bg-black/50 text-white backdrop-blur-sm"
                variant="secondary"
              >
                {video.label}
              </Badge>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoCarousel;
