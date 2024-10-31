function SkeletonHeader() {
  return (
    <div className="h-16 bg-transparent animate-pulse flex justify-between" >
      <div className="h-full w-full md:w-1/4 bg-slate-800 rounded-lg"></div>
      <div className="h-full md:w-1/3 bg-slate-800 rounded-lg"></div>
      <div className="h-full md:w-1/3 bg-slate-800 rounded-lg"></div>
    </div>
  );
}

export default SkeletonHeader;