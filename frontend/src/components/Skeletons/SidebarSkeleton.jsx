
const SidebarSkeleton = () => {
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-[#49d19c] bg-gradient-to-b from-[#162c22] via-[#1e3c2f] to-[#1a3e2e] text-[#b4f0a7] flex flex-col animate-pulse">
      {/* Header Skeleton */}
      <div className="p-5 border-b border-[#49d19c]">
        <div className="h-6 w-24 bg-[#2f5b44] rounded-lg" />
      </div>

      {/* User Skeletons */}
      <div className="flex-1 px-3 py-4 space-y-4 overflow-y-auto">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-2 rounded-xl bg-[#2f5b44] shadow"
          >
            <div className="w-12 h-12 bg-[#3b6651] rounded-full" />
            <div className="hidden lg:block w-full space-y-2">
              <div className="w-3/4 h-3 bg-[#3b6651] rounded" />
              <div className="w-1/2 h-3 bg-[#3b6651] rounded" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
