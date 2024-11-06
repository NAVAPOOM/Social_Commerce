"use client";

import React from "react";

import {cn} from "@/utils/cn";
import products from "./products";

import ProductListItem from "./product-list-item";

export type ProductGridProps = React.HTMLAttributes<HTMLDivElement> & {
  itemClassName?: string;
};

const productsWithRatingsAndDescription = products.map((product) => ({
  ...product,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam auctor, augue eget cursus mattis.",
}));


const ProductsGrid = React.forwardRef<HTMLDivElement, ProductGridProps>(
  ({itemClassName, className, ...props}, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid w-full grid-cols-1 gap-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
          className,
        )}
        {...props}
      >
        {productsWithRatingsAndDescription.map((product) => (
          <ProductListItem
            key={product.id}
            removeWrapper
            {...product}
            className={cn("w-full snap-start", itemClassName)}
          />
        ))}
      </div>
    );
  },
);

ProductsGrid.displayName = "ProductsGrid";

export default ProductsGrid;
