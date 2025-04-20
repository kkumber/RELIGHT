const SkeletonBookListAnimation = () => {
  return (
    <div className="flex flex-col animate-pulse gap-4">
      <div className="h-48 w-full md:h-52 bg-gray-200 rounded-md dark:bg-neutral-700"></div>
      <div className="flex flex-shrink">
        <span className="w-full h-4 bg-gray-200 rounded-md dark:bg-neutral-700"></span>
      </div>
    </div>
  );
};

export default SkeletonBookListAnimation;
