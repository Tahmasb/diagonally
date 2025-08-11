import ProductDetailsPage from "@pages/ProductDetailsPage";
import { mainAxios } from "@utils/axios";
import { Product as ProductType } from "src/types/Product";

type ProductProps = {
  params: Promise<{ productId: string }>;
};

const Product = async ({ params }: ProductProps) => {
  const { productId } = await params;

  let productData: ProductType | null = null;
  try {
    const res = await mainAxios.get(`/products/${productId}`);
    productData = res.data;
  } catch (error) {
    console.log("Server fetch error:", error);
    productData = null;
  }

  return <ProductDetailsPage product={productData} />;
};

export default Product;
