
import VideoCarousel from '../components/VideoCarousel';

const Index = () => {
  return (
    <div className="min-h-screen bg-black overflow-hidden relative flex flex-col items-center justify-center">
      {/* Background with vignette effect */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/80 mix-blend-multiply" />
      </div>

      <div className="w-full h-full flex flex-col items-center justify-center gap-8 md:gap-12 py-8 md:py-12 relative z-10">
        {/* Hero Content */}
        <div className="text-center px-4">
          <h1 className="text-3xl md:text-4xl font-serif mb-2 tracking-wide animate-fade-in text-white">
            Video Collection
          </h1>
          <p className="text-base md:text-lg text-gray-200 mb-3 animate-fade-in max-w-2xl mx-auto">
            Explore our curated collection of stunning videos
          </p>
        </div>

        {/* Carousel Container */}
        <div className="w-full max-w-[85vw] md:max-w-[90vw] scale-[0.7] md:scale-[0.85] perspective-[2000px] transform-style-preserve-3d">
          <VideoCarousel />
        </div>
      </div>
    </div>
  );
};

export default Index;
