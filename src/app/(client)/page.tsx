import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { getBanner } from "@/sanity/lib/banner/getBanner";
import ProductView from "@/components/ProductView";
import Banner from "@/components/BannerView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategory";

export const dynamic = "force-static";
export const revalidate = 30;


export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  const banner = await getBanner();
  return (
    <div>
      <div>
        <Banner banner={banner} />
      </div>
      <div>
        <ProductView products={products} categories={categories} />
      </div>
    </div>
  );
}
