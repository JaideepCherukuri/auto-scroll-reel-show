
import React, { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Video {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  description: string;
  label?: 'Top Choice' | 'New' | 'Mixed' | 'Collection';
  background: string;
}

const videos: Video[] = [
  {
    id: '1',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: '/lovable-uploads/2a48033f-11a4-44cc-8b8b-31ed013ea791.png',
    title: 'Desert Wonders',
    description: 'Where silence speaks, dunes shift, and the adventure begins.',
    label: 'Top Choice',
    background: '/lovable-uploads/7f0810f6-9421-4df7-9654-6dc73bfe53f3.png',
  },
  {
    id: '2',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: '/lovable-uploads/2a48033f-11a4-44cc-8b8b-31ed013ea791.png',
    title: 'Ocean Depths',
    description: 'Dive into the mysterious world beneath the waves.',
    label: 'New',
    background: '/lovable-uploads/7f0810f6-9421-4df7-9654-6dc73bfe53f3.png',
  },
  {
    id: '3',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: '/lovable-uploads/2a48033f-11a4-44cc-8b8b-31ed013ea791.png',
    title: 'Mountain Peaks',
    description: 'Rise above the clouds and touch the sky.',
    label: 'Mixed',
    background: '/lovable-uploads/7f0810f6-9421-4df7-9654-6dc73bfe53f3.png',
  },
  {
    id: '4',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: '/lovable-uploads/2a48033f-11a4-44cc-8b8b-31ed013ea791.png',
    title: 'Forest Tales',
    description: 'Where ancient trees whisper stories of the wild.',
    label: 'Collection',
    background: '/lovable-uploads/7f0810f6-9421-4df7-9654-6dc73bfe53f3.png',
  },
];

const VideoCarousel = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean[]>(new Array(videos.length).fill(false));
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const playCurrentVideo = () => {
      videoRefs.current.forEach((videoRef, index) => {
        if (videoRef) {
          if (index === currentVideoIndex) {
            videoRef.play().catch(() => {
              console.log('Video play failed');
            });
            setIsVideoPlaying(prev => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          } else {
            videoRef.pause();
            videoRef.currentTime = 0;
            setIsVideoPlaying(prev => {
              const newState = [...prev];
              newState[index] = false;
              return newState;
            });
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

  const toggleFavorite = (videoId: string) => {
    setFavorites(prev =>
      prev.includes(videoId)
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto p-4">
      {/* Background Image - Fixed path issue */}
      <div 
        className="fixed inset-0 z-0 transition-opacity duration-500 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(${videos[currentVideoIndex].background})`,
          opacity: 0.8
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 text-center mb-12 text-white">
        <h1 className="text-5xl font-serif mb-4 tracking-wide animate-fade-in">
          {videos[currentVideoIndex].title}
        </h1>
        <p className="text-xl text-gray-200 mb-6 animate-fade-in">
          {videos[currentVideoIndex].description}
        </p>
        <Button
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white animate-scale-in"
          onClick={() => toggleFavorite(videos[currentVideoIndex].id)}
        >
          <Heart className={cn(
            "mr-2",
            favorites.includes(videos[currentVideoIndex].id) && "fill-white"
          )} />
          Favorite
        </Button>
      </div>

      {/* Video Grid with Enhanced 3D Effect */}
      <div 
        ref={containerRef}
        className="relative z-10 perspective-1000 transform-gpu h-[300px] flex items-center justify-center"
      >
        <div className="relative flex gap-4 transform-gpu" 
             style={{ 
               transform: 'rotateX(10deg) translateZ(-100px)',
               transformStyle: 'preserve-3d'
             }}>
          {videos.map((video, index) => {
            const offset = index - currentVideoIndex;
            const rotation = offset * -15; // Adjust rotation angle for curved effect
            const translateZ = Math.abs(offset) * 20; // Add depth effect
            const opacity = 1 - Math.min(0.6, Math.abs(offset) * 0.2); // Fade based on distance

            return (
              <div
                key={video.id}
                className={cn(
                  "relative rounded-lg overflow-hidden cursor-pointer transition-all duration-500 transform-gpu",
                  "w-[250px] h-[200px]",
                  "hover:ring-2 hover:ring-white/50",
                  index === currentVideoIndex && "ring-2 ring-white scale-110 z-10"
                )}
                style={{
                  transform: `perspective(1000px) rotateY(${rotation}deg) translateZ(${translateZ}px)`,
                  opacity: opacity,
                  transformOrigin: 'center center',
                }}
                onClick={() => setCurrentVideoIndex(index)}
              >
                {/* Thumbnail - Fixed path issue */}
                {!isVideoPlaying[index] && (
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  className={cn(
                    "w-full h-full object-cover",
                    !isVideoPlaying[index] && "hidden"
                  )}
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
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white font-medium truncate">{video.title}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoCarousel;
