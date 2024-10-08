import React from "react";

export default function Loading() {
  return (
    <div
      className="spinner-border animate-spin inline-block w-9 h-9 border-dashed border-4 rounded-full border-current border-t-transparent text-blue-600"
      role="status"
    ></div>
  );
}
