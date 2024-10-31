function ContentSkeleton() {
  return (
    <div className="flex-grow p-4">
        <div className="w-full h-auto flex flex-wrap gap-3 my-2 bg-transparent">
            <div className="h-[200px] w-1/4 bg-slate-800 animate-pulse rounded-lg"></div>
            <div className="h-[200px] w-1/4 bg-slate-800 animate-pulse rounded-lg"></div>
            <div className="h-[200px] w-1/4 bg-slate-800 animate-pulse rounded-lg"></div>
            <div className="h-[200px] w-1/4 bg-slate-800 animate-pulse rounded-lg"></div>
        </div>
        <div className="w-full h-auto hidden md:flex gap-3 my-2">
            <div className="h-[200px] w-1/4 bg-slate-800 animate-pulse rounded-lg"></div>
            <div className="h-[200px] w-1/4 bg-slate-800 animate-pulse rounded-lg"></div>
            <div className="h-[200px] w-1/4 bg-slate-800 animate-pulse rounded-lg"></div>
            <div className="h-[200px] w-1/4 bg-slate-800 animate-pulse rounded-lg"></div>
        </div>
        <div className="w-full h-auto hidden md:flex gap-3 my-2">
            <div className="h-[200px] w-1/4 bg-slate-800 animate-pulse rounded-lg"></div>
            <div className="h-[200px] w-1/4 bg-slate-800 animate-pulse rounded-lg"></div>
            <div className="h-[200px] w-1/4 bg-slate-800 animate-pulse rounded-lg"></div>
            <div className="h-[200px] w-1/4 bg-slate-800 animate-pulse rounded-lg"></div>
        </div>
       
  </div>
  )
}

export default ContentSkeleton