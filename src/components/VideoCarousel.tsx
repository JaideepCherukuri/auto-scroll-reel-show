
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
    thumbnail: 'public/lovable-uploads/2a48033f-11a4-44cc-8b8b-31ed013ea791.png',
    title: 'Desert Wonders',
    description: 'Where silence speaks, dunes shift, and the adventure begins.',
    label: 'Top Choice',
    background: 'public/lovable-uploads/7f0810f6-9421-4df7-9654-6dc73bfe53f3.png',
  },
  {
    id: '2',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'public/lovable-uploads/2a48033f-11a4-44cc-8b8b-31ed013ea791.png',
    title: 'Ocean Depths',
    description: 'Dive into the mysterious world beneath the waves.',
    label: 'New',
    background: 'public/lovable-uploads/7f0810f6-9421-4df7-9654-6dc73bfe53f3.png',
  },
  {
    id: '3',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'public/lovable-uploads/2a48033f-11a4-44cc-8b8b-31ed013ea791.png',
    title: 'Mountain Peaks',
    description: 'Rise above the clouds and touch the sky.',
    label: 'Mixed',
    background: 'public/lovable-uploads/7f0810f6-9421-4df7-9654-6dc73bfe53f3.png',
  },
  {
    id: '4',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: 'public/lovable-uploads/2a48033f-11a4-44cc-8b8b-31ed013ea791.png',
    title: 'Forest Tales',
    description: 'Where ancient trees whisper stories of the wild.',
    label: 'Collection',
    background: 'public/lovable-uploads/7f0810f6-9421-4df7-9654-6dc73bfe53f3.png',
  },
];

const VideoCarousel = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);
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

  const toggleFavorite = (videoId: string) => {
    setFavorites(prev =>
      prev.includes(videoId)
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto p-4">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 transition-opacity duration-500"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(${videos[currentVideoIndex].background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.8
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 text-center mb-12 text-white">
        <h1 className="text-5xl font-serif mb-4 tracking-wide">
          {videos[currentVideoIndex].title}
        </h1>
        <p className="text-xl text-gray-200 mb-6">
          {videos[currentVideoIndex].description}
        </p>
        <Button
          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white"
          onClick={() => toggleFavorite(videos[currentVideoIndex].id)}
        >
          <Heart className={cn(
            "mr-2",
            favorites.includes(videos[currentVideoIndex].id) && "fill-white"
          )} />
          Favorite
        </Button>
      </div>

      {/* Video Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className={cn(
              "relative rounded-lg overflow-hidden cursor-pointer transition-all duration-500",
              "hover:ring-2 hover:ring-white/50",
              index === currentVideoIndex && "ring-2 ring-white scale-105"
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
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <h3 className="text-white font-medium truncate">{video.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoCarousel;
