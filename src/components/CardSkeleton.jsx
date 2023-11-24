const CardSkeleton = () => {
  return (
    <div
      className="relative animate-pulse rounded-md border-[1px] border-gray-200 py-4 pl-7 pr-4
     shadow-sm transition-all hover:shadow-lg md:w-96"
    >
      <div className="absolute -left-4 flex h-8 w-8 rounded-sm bg-gray-300 shadow-md"></div>
      <div className="mb-2 h-5 w-full rounded-lg bg-gray-300"></div>
      <div className="mb-5 h-5 w-2/3 rounded-lg bg-gray-300"></div>
      <div className="mb-5 h-5 w-3/4 rounded-lg bg-gray-300"></div>
    </div>
  );
};

export default CardSkeleton;
