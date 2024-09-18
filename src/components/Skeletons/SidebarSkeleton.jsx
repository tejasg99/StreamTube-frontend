function SkeletonSidebar() {
  return (
    <div className="w-64 h-screen bg-gray-800 animate-pulse">
      <div className="h-12 w-full bg-gray-600 mb-4"></div>
      <div className="h-12 w-full bg-gray-600 mb-4"></div>
      <div className="h-12 w-full bg-gray-600 mb-4"></div>
    </div>
  );
}

export default SkeletonSidebar;