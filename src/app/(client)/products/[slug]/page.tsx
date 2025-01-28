import { urlFor } from "@/sanity/lib/image";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import Image from "next/image";
import { notFound } from "next/navigation";
import AddToBasketButton from "@/components/AddToBasketButton";

export const dynamic = "force-static";
export const revalidate = 30;

async function ProductPage({ params }: { params: Promise<{ slug: string }>; }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    console.log("error")
    return notFound()
  }

  //if product outOfSTOCK
  const isOutStock = product.stock != null && Number(product.stock) <= 0;

  return (
    <div className="container mx-auto px-10 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          className={`relative aspect-square overflow-hidden rounded-lg shadow-lg ${
            isOutStock ? "opacity-50" : ""
          }`}
        >
          {product.productImage && (
            <Image
              src={
                product.productImage ? urlFor(product.productImage).url() : ""
              }
              alt={product.productName || "Product Image"}
              fill
              className="object-contain transition-transform duration-300 hover:scale-105"
            />
          )}

          {isOutStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white font-bold text-lg">Out Of Stock</span>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.productName}</h1>
            <div className="text-xl font-semibold mb-4">
              ${(product.price ?? 0).toFixed(2)}
            </div>
            <div className="prose max-w-none mb-6">
                {product.description}
            </div>
          </div>
          <div className="mt-6">
            <AddToBasketButton product={product} disabled={isOutStock}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
