
import React from "react";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "block" | "circle" | "text";
  lines?: number;
}

export function Skeleton({
  variant = "block",
  lines = 1,
  className = "",
  ...props
}: SkeletonProps) {
  const baseClass = "skeleton-base";

  if (variant === "text") {
    return (
      <div 
        className="flex w-full flex-col gap-2" 
        aria-hidden="true" 
        {...props}
      >
        {Array.from({ length: lines }).map((_, i) => {
          const isLastLine = i === lines - 1 && lines > 1;
          const widthClass = isLastLine ? "w-[60%]" : "w-full";
          
          return (
            <div
              key={i}
              className={`${baseClass} h-4 rounded-md ${widthClass} ${className}`.trim()}
            />
          );
        })}
      </div>
    );
  }

  const shapeClass = variant === "circle" ? "rounded-full" : "rounded-md";

  return (
    <div
      aria-hidden="true"
      className={`${baseClass} ${shapeClass} ${className}`.trim()}
      {...props}
    />
  );
}