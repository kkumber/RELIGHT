const SkeletonNewBookAnimation = () => {
  return (
    <div className="flex md:flex-col animate-pulse gap-4">
      <div className="bg-gray-200 rounded-md dark:bg-neutral-700 w-20 md:w-full h-32 md:h-40"></div>
      <div className="flex flex-col gap-2">
        <span className="bg-gray-200 rounded-md dark:bg-neutral-700 w-16 h-4"></span>
        <span className="bg-gray-200 rounded-md dark:bg-neutral-700 w-20 h-4"></span>
      </div>
    </div>
  );
};

export default SkeletonNewBookAnimation;
