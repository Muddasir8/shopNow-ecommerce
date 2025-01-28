import ProductView from "@/components/ProductView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategory";
import { getProducyByCategory } from "@/sanity/lib/products/getProducyByCategory";
import React from "react";

async function Categorypage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const products = await getProducyByCategory(slug);
  const categories = await getAllCategories();
  return (
    <div className="flex text-black flex-col items-center justify-start min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center ">
          {slug
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join("")}{" "}
          Collections
        </h1>
        <ProductView products={products} categories={categories} />
      </div>
    </div>
  );
}

export default Categorypage;
