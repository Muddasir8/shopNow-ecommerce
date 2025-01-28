import React from "react";
import { Product } from "../../sanity.types";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

function ProductCard ({ product }: { product: Product }) {
  const isOutStock = product.stock != null && Number(product.stock) <= 0;
  return (
    <Link
      href={`/products/${product.slug?.current}`}
      className={`group flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${
        isOutStock ? "opacity-50" : ""
      }`}
    >
      <div className="relative aspect-square w-full h-full overflow-hidden">
        {product && (
          <Image
            src={
              product.productImage ? urlFor(product.productImage).url() : ""
            }
            alt="Product Image"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />
        )}

        {isOutStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <span className="text-white font-bold text-lg">Out Of Stock</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {product.productName}
        </h2>

        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center gap-4 ">
        <p className="mt-2 text-lg font-bold text-gray-900">${product .price?.toFixed(2)}</p>   
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
