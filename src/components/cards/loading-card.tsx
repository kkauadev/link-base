import React, { HTMLAttributes } from "react";

interface LoadingCardProps extends HTMLAttributes<HTMLDivElement> {
  isLoading: boolean;
  quantity?: number;
  children: React.ReactNode;
}

export const LoadingCard = ({
  isLoading,
  children,
  quantity = 1,
  className,
  ...props
}: LoadingCardProps) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <>
      {isLoading && (
        <div {...props} className={`animate-pulse flex ${className}`}>
          {[...Array(quantity)].map((_, index) => (
            <div className="" key={index}>
              {childrenArray.map((child, index) => {
                return React.cloneElement(child as React.ReactElement, {
                  key: index,
                });
              })}
            </div>
          ))}
        </div>
      )}
    </>
  );
};
