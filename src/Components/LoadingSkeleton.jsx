import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingSkeleton = () => {
  return (
    <div className="p-1 rounded-lg bg-gray-300">
      <div className="relative block">
        <Skeleton className="w-full h-44 rounded-sm" />
      </div>

      <Skeleton height={16} width="50%" className="mt-1" />
      <Skeleton height={16} width="100%" className="mt-2" />
    </div>
  );
};

export default LoadingSkeleton;
