
import VideoCarousel from '../components/VideoCarousel';

const Index = () => {
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
      <div className="relative h-full z-10 flex flex-col items-center">
        {/* Hero Section */}
        <div className="pt-8 md:pt-12 text-center">
          <p className="text-base md:text-lg text-gray-200 animate-fade-in max-w-2xl mx-auto px-4">
            Explore our curated collection of stunning videos
          </p>
        </div>

        {/* Centered Carousel Section */}
        <div className="flex-1 flex items-center justify-center w-full">
          <div className="w-full max-w-[85vw] md:max-w-[90vw] scale-[0.65] md:scale-[0.8] perspective-[2000px] transform-style-preserve-3d">
            <VideoCarousel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
