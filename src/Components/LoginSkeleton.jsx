import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function LoginSkeleton() {
  return (
    <div className="flex items-center flex-col justify-center min-h-screen bg-slate-200 p-4">
      <div className="w-full sm:w-[75%] md:w-[50%] lg:w-[30%] bg-white rounded-lg h-fit p-5">
        <div className="flex justify-center gap-x-4 pt-6">
          <div className="flex items-center justify-center w-24 h-10 bg-gray-300 rounded-lg">
            <Skeleton width={80} height={30} />
          </div>
          <div className="flex items-center justify-center w-24 h-10 bg-gray-300 rounded-lg">
            <Skeleton width={80} height={30} />
          </div>
        </div>

        <div className="flex flex-col py-5 px-5">
          <label className="text-lg font-medium">
            <Skeleton width={100} height={20} />
          </label>
          <div className="bg-blue-100 p-3 rounded-md">
            <Skeleton height={40} />
          </div>
        </div>
        <div className="flex flex-col py-5 px-5">
          <label className="text-lg font-medium">
            <Skeleton width={100} height={20} />
          </label>
          <div className="bg-blue-100 p-3 rounded-md">
            <Skeleton height={40} />
          </div>
        </div>
        <div className="p-5">
          <div className="bg-gray-300 w-full p-3 rounded-lg">
            <Skeleton height={40} />
          </div>
        </div>
      </div>
    </div>
  );
}
