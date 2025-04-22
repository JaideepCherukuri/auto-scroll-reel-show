
const Index = () => {
  return (
    <div className="h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full max-w-[90vw] perspective-[2000px] transform-style-preserve-3d">
          <VideoCarousel />
        </div>
      </div>
    </div>
  );
};

export default Index;
