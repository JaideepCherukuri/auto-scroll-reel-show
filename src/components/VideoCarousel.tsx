
import React, { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Video {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  description: string;
  label?: 'Top Choice' | 'New' | 'Mixed' | 'Collection';
  background: string;
  aspectRatio: '1:1' | '4:5' | '16:9' | '9:16';
}

const videos: Video[] = [
  {
    id: '1',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
    title: 'Mountain Wildlife',
    description: 'Majestic deer in their natural habitat',
    label: 'Top Choice',
    background: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
    aspectRatio: '16:9',
  },
  {
    id: '2',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716',
    title: 'Waterfall Bridge',
    description: 'Scenic bridge over majestic falls',
    label: 'New',
    background: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716',
    aspectRatio: '9:16',
  },
  {
    id: '3',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
    title: 'Wildflower Fields',
    description: 'Vibrant orange flowers in bloom',
    label: 'Mixed',
    background: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
    aspectRatio: '1:1',
  },
  {
    id: '4',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
    title: 'Mountain River',
    description: 'Pristine river through mountains',
    label: 'Collection',
    background: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb',
    aspectRatio: '16:9',
  },
  {
    id: '5',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9',
    title: 'Pine Forest',
    description: 'Dense pine forest vista',
    label: 'Top Choice',
    background: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9',
    aspectRatio: '4:5',
  },
  {
    id: '6',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86',
    title: 'Forest Canopy',
    description: 'Towering trees reaching skyward',
    label: 'New',
    background: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86',
    aspectRatio: '1:1',
  },
  {
    id: '7',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843',
    title: 'Sun Through Trees',
    description: 'Golden sunlight filtering through leaves',
    label: 'Mixed',
    background: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843',
    aspectRatio: '9:16',
  },
  {
    id: '8',
    url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
    title: 'Mountain Rays',
    description: 'Sunbeams over mountain peaks',
    label: 'Collection',
    background: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
    aspectRatio: '16:9',
  }
];

const VideoCarousel = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean[]>(new Array(videos.length).fill(false));
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoScrollTimerRef = useRef<number | null>(null);

  const startAutoScroll = () => {
    if (autoScrollTimerRef.current) {
      clearTimeout(autoScrollTimerRef.current);
    }
    autoScrollTimerRef.current = window.setTimeout(() => {
      handleNext();
    }, 5000);
  };

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (autoScrollTimerRef.current) {
        clearTimeout(autoScrollTimerRef.current);
      }
    };
  }, [currentVideoIndex]);

  const handlePrevious = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const handleNext = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  };

  useEffect(() => {
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
  }, [currentVideoIndex]);

  const toggleFavorite = (videoId: string) => {
    setFavorites(prev =>
      prev.includes(videoId)
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  const getAspectRatioClass = (ratio: string) => {
    switch (ratio) {
      case '1:1':
        return 'aspect-square w-[400px]';
      case '4:5':
        return 'aspect-[4/5] w-[320px]';
      case '16:9':
        return 'aspect-video w-[500px]';
      case '9:16':
        return 'aspect-[9/16] w-[225px]';
      default:
        return 'aspect-video w-[500px]';
    }
  };

  // Calculate the infinite scroll indices
  const getVisibleIndices = () => {
    const totalVideos = videos.length;
    const indices = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentVideoIndex + i + totalVideos) % totalVideos;
      indices.push(index);
    }
    return indices;
  };

  return (
    <div className="relative w-full max-w-[2000px] mx-auto p-4">
      <div 
        className="fixed inset-0 z-0 transition-opacity duration-500 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(${videos[currentVideoIndex].background})`,
          opacity: 0.8
        }}
      />

      <div className="relative z-10 text-center mb-8 text-white">
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

      <Button
        variant="ghost"
        size="icon"
        className="fixed left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/30 hover:bg-black/50 text-white"
        onClick={handlePrevious}
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="fixed right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/30 hover:bg-black/50 text-white"
        onClick={handleNext}
      >
        <ArrowRight className="h-6 w-6" />
      </Button>

      <div 
        ref={containerRef}
        className="relative z-10 perspective-2000 transform-gpu h-[700px] flex items-center justify-center overflow-visible"
      >
        <div 
          className="relative flex gap-4 transform-gpu" 
          style={{ 
            transform: `rotateX(5deg) translateZ(-50px)`,
            transformStyle: 'preserve-3d'
          }}
        >
          {getVisibleIndices().map((index, i) => {
            const offset = i - 2; // Center is at index 2
            const rotation = offset * -12; // Reduced rotation angle
            const translateX = offset * 40; // Reduced spacing
            const translateZ = Math.abs(offset) * -80; // Increased depth
            const opacity = 1 - Math.min(0.8, Math.abs(offset) * 0.3);
            const video = videos[index];

            return (
              <div
                key={`${video.id}-${index}`}
                className={cn(
                  "relative overflow-hidden cursor-pointer transition-all duration-500 transform-gpu",
                  getAspectRatioClass(video.aspectRatio),
                  "rounded-lg",
                  "hover:ring-2 hover:ring-white/50",
                  index === currentVideoIndex && "ring-2 ring-white scale-110 z-10"
                )}
                style={{
                  transform: `perspective(2000px) rotateY(${rotation}deg) translateX(${translateX}px) translateZ(${translateZ}px)`,
                  opacity: opacity,
                  transformOrigin: '50% 50%',
                }}
                onClick={() => setCurrentVideoIndex(index)}
              >
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
