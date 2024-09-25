function SkeletonHeader() {
  return (
    <div className="h-16 bg-slate-800 animate-pulse flex justify-between" >
      <div className="h-full w-1/4 bg-slate-700 rounded-lg"></div>
      <div className="h-full w-1/3 bg-slate-700 rounded-lg"></div>
      <div className="h-full w-1/3 bg-slate-700 rounded-lg"></div>
    </div>
  );
}

export default SkeletonHeader;