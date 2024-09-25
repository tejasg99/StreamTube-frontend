function SkeletonSidebar() {
  return (
    <div className="w-64 h-screen bg-slate-900 animate-pulse flex flex-col gap-20">
      <div className="top">
        <div className="h-12 w-[95%] bg-slate-700 my-2 rounded-lg mx-1"></div>
        <div className="h-12 w-[95%] bg-slate-700 my-2 rounded-lg mx-1"></div>
        <div className="h-12 w-[95%] bg-slate-700 my-2 rounded-lg mx-1"></div>
        <div className="h-12 w-[95%] bg-slate-700 my-2 rounded-lg mx-1"></div>
        <div className="h-12 w-[95%] bg-slate-700 my-2 rounded-lg mx-1"></div>
        <div className="h-12 w-[95%] bg-slate-700 my-2 rounded-lg mx-1"></div>
        <div className="h-12 w-[95%] bg-slate-700 my-2 rounded-lg mx-1"></div>
      </div>
      <div className="bottom">
        <div className="h-12 w-[95%] bg-slate-700 mb-2 rounded-lg mx-1"></div>
        <div className="h-12 w-[95%] bg-slate-700 mb-2 rounded-lg mx-1"></div>
      </div>

    </div>
  );
}

export default SkeletonSidebar;