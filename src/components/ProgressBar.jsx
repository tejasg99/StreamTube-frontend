function ProgressBar() {
  return (
    <div className="sticky top-0 z-40 w-full h-2 bg-gray-200 overflow-hidden">
      <div
        className="absolute h-2 bg-[#6b219f] w-1/4 animate-slide"
        style={{
          animationDuration: "2s",
          animationIterationCount: "infinite",
        }}
      ></div>
    </div>
  );
}

export default ProgressBar;
