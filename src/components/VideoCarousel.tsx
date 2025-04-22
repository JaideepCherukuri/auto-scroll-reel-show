
import React, { useState, useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { videos, Video } from '../data/videos';

interface VideoCarouselProps {
  isTransitioning: boolean;
}

const VideoCarousel = ({ isTransitioning }: VideoCarouselProps) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean[]>(new Array(videos.length).fill(false));
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(new Array(videos.length).fill(false));
  const [videosLoaded, setVideosLoaded] = useState<boolean[]>(new Array(videos.length).fill(false));
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoScrollTimerRef = useRef<number | null>(null);

  // Preload images
  useEffect(() => {
    videos.forEach((video, index) => {
      const img = new Image();
      img.src = video.thumbnail;
      img.onload = () => {
        setImagesLoaded(prev => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      };
    });
  }, []);

  // Handle video preloading
  useEffect(() => {
    const handleVideoCanPlayThrough = (index: number) => {
      setVideosLoaded(prev => {
        const newState = [...prev];
        newState[index] = true;
        return newState;
      });
    };

    videoRefs.current.forEach((videoRef, index) => {
      if (videoRef) {
        videoRef.addEventListener('canplaythrough', () => handleVideoCanPlayThrough(index));
      }
    });

    return () => {
      videoRefs.current.forEach((videoRef, index) => {
        if (videoRef) {
          videoRef.removeEventListener('canplaythrough', () => handleVideoCanPlayThrough(index));
        }
      });
    };
  }, []);

  const startAutoScroll = () => {
    if (autoScrollTimerRef.current) {
      clearTimeout(autoScrollTimerRef.current);
    }
    
    if (!isTransitioning) {
      autoScrollTimerRef.current = window.setTimeout(() => {
        handleNext();
      }, 5000);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      startAutoScroll();
    }
    
    return () => {
      if (autoScrollTimerRef.current) {
        clearTimeout(autoScrollTimerRef.current);
      }
    };
  }, [currentVideoIndex, isTransitioning]);

  useEffect(() => {
    if (!isTransitioning) {
      videoRefs.current.forEach((videoRef, index) => {
        if (videoRef) {
          if (index === currentVideoIndex) {
            // Wait a bit to ensure smooth transition before playing
            setTimeout(() => {
              videoRef.play().catch(() => {
                console.log('Video play failed');
              });
              setIsVideoPlaying(prev => {
                const newState = [...prev];
                newState[index] = true;
                return newState;
              });
            }, 500);
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
    }
  }, [currentVideoIndex, isTransitioning]);

  const handlePrevious = () => {
    if (!isTransitioning) {
      setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
    }
  };

  const handleNext = () => {
    if (!isTransitioning) {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    }
  };

  const toggleFavorite = (videoId: string) => {
    if (!isTransitioning) {
      setFavorites(prev =>
        prev.includes(videoId)
          ? prev.filter(id => id !== videoId)
          : [...prev, videoId]
      );
    }
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

  const getVisibleIndices = () => {
    const totalVideos = videos.length;
    const indices = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentVideoIndex + i + totalVideos) % totalVideos;
      indices.push(index);
    }
    return indices;
  };

  const getTransitionIndices = () => {
    const totalVideos = videos.length;
    const indices = [];
    for (let i = -4; i <= 4; i++) {
      const index = (currentVideoIndex + i + totalVideos) % totalVideos;
      indices.push(index);
    }
    return indices;
  };

  return (
    <div className="relative w-full mx-auto">
      <div className={cn(
        "relative z-10 text-center mb-4 text-white",
        isTransitioning ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'
      )}>
        <h1 className="text-4xl md:text-5xl font-serif mb-3 tracking-wide animate-fade-in">
          {videos[currentVideoIndex].title}
        </h1>
        <p className="text-base md:text-lg text-gray-200 mb-4 animate-fade-in max-w-2xl mx-auto">
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
        className={cn(
          "fixed left-2 md:left-8 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-12 md:h-12 rounded-full bg-black/30 hover:bg-black/50 text-white",
          isTransitioning ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'
        )}
        onClick={handlePrevious}
      >
        <ArrowLeft className="h-4 w-4 md:h-6 md:w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "fixed right-2 md:right-8 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-12 md:h-12 rounded-full bg-black/30 hover:bg-black/50 text-white",
          isTransitioning ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'
        )}
        onClick={handleNext}
      >
        <ArrowRight className="h-4 w-4 md:h-6 md:w-6" />
      </Button>

      <div 
        ref={containerRef}
        className={cn(
          "relative z-10 perspective-2000 transform-gpu flex items-center justify-center overflow-visible h-[60vh] transition-all duration-[3500ms]",
          isTransitioning ? "scale-[0.4]" : "scale-75 md:scale-85"
        )}
      >
        <div 
          className={cn(
            "relative flex gap-3 md:gap-4 transform-gpu transition-all duration-[3500ms]", 
          )}
          style={{ 
            transform: `rotateX(${isTransitioning ? '15deg' : '5deg'}) translateZ(-30px)`,
            transformStyle: 'preserve-3d',
            transition: "all 3.5s cubic-bezier(0.215, 0.610, 0.355, 1.000)"
          }}
        >
          {(isTransitioning ? getTransitionIndices() : getVisibleIndices()).map((index, i) => {
            const totalItems = isTransitioning ? 9 : 5;
            const centerOffset = Math.floor(totalItems / 2);
            const offset = i - centerOffset;
            const rotation = isTransitioning ? offset * -7 : offset * -10;
            const translateX = isTransitioning ? offset * 25 : offset * 30;
            const translateZ = isTransitioning ? Math.abs(offset) * -50 : Math.abs(offset) * -60;
            const opacity = isTransitioning 
              ? 1 - Math.min(0.6, Math.abs(offset) * 0.15)
              : 1 - Math.min(0.8, Math.abs(offset) * 0.3);
              
            const video = videos[index];

            return (
              <div
                key={`${video.id}-${index}`}
                className={cn(
                  "relative overflow-hidden cursor-pointer transition-all duration-1000 transform-gpu",
                  getAspectRatioClass(video.aspectRatio),
                  "rounded-lg",
                  "hover:ring-2 hover:ring-white/50",
                  index === currentVideoIndex && !isTransitioning && "ring-2 ring-white scale-110 z-10"
                )}
                style={{
                  transform: `perspective(2000px) rotateY(${rotation}deg) translateX(${translateX}px) translateZ(${translateZ}px)`,
                  opacity: opacity,
                  transformOrigin: '50% 50%',
                  transition: 'all 3.5s cubic-bezier(0.215, 0.610, 0.355, 1.000)'
                }}
                onClick={() => !isTransitioning && setCurrentVideoIndex(index)}
              >
                {(!isVideoPlaying[index] || isTransitioning) && (
                  <img
                    ref={(el) => (imageRefs.current[index] = el)}
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    loading="eager" // Force eager loading for transition images
                    onLoad={() => {
                      setImagesLoaded(prev => {
                        const newState = [...prev];
                        newState[index] = true;
                        return newState;
                      });
                    }}
                  />
                )}
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  className={cn(
                    "w-full h-full object-cover",
                    (!isVideoPlaying[index] || isTransitioning) && "hidden"
                  )}
                  src={video.url}
                  muted
                  playsInline
                  loop
                  preload="auto" // Preload video content
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
