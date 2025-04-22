
import { useEffect, useState } from 'react';
import VideoCarousel from '../components/VideoCarousel';
import { videos } from '../data/videos';

const Index = () => {
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    // Set transition to complete after animation duration
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 2000); // 2 seconds transition

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen bg-black overflow-hidden relative">
      {/* Fixed fullscreen background with stronger vignette */}
      <div 
        className="fixed inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${videos[0].background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/90" />
      </div>

      {/* Content Container */}
      <div className="relative h-full z-10 flex flex-col items-center justify-center">
        {/* Centered Carousel Section */}
        <div className="flex-1 flex items-center justify-center w-full">
          <div 
            className={`w-full max-w-[85vw] md:max-w-[90vw] transform-gpu transition-all duration-2000 ease-out perspective-[2000px] transform-style-preserve-3d ${
              isTransitioning 
                ? 'scale-[0.4] md:scale-[0.5] opacity-95' 
                : 'scale-[0.65] md:scale-[0.8] opacity-100'
            }`}
          >
            <VideoCarousel isTransitioning={isTransitioning} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
