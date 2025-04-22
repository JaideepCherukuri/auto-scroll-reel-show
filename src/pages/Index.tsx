
import VideoCarousel from '../components/VideoCarousel';

const Index = () => {
  return (
    <div className="min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
      {/* Enhanced 3D environment */}
      <div className="w-full h-full perspective-[2000px] transform-gpu">
        <VideoCarousel />
      </div>
    </div>
  );
};

export default Index;
