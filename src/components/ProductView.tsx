import React from "react";
import { Category, Product } from "../../sanity.types";
import ProductGrid from "./ProductGrid";
import { CategorySelectorComponent } from "./ui/category-selector";

interface ProductViewProps {
  categories: Category[];
  products: Product[];
}
const ProductView = ({ products, categories }: ProductViewProps) => {
  return (
    <div className="flex flex-col ">
      <div className="w-full px-4 sm:px-0 ml-6 sm:w-[200px]">
        <CategorySelectorComponent categories={categories} />
      </div>
      <div className="flex-1 py-8">
        <div>
          <ProductGrid products={products} />
          <hr className="w-1/2 sm:w-3/4" />
        </div>
      </div>
    </div>
  );
};

export default ProductView;
