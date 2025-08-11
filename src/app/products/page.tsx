import ProductsPage from "@pages/ProductsPage";
import { mainAxios } from "@utils/axios";
import { ProductApiResponse } from "src/types/Product";

// من بنا بر اینکه سئو مهمه سرور ساید کردم
// میتونین نسخه کلاینت ساید رو توی کامیت  7 f8be71ba0ba34dce31cc40653f52f354cee8b6a ببینی

type ProductProps = {
  searchParams: Promise<{ page: string; limit: string }>;
};

const Products = async ({ searchParams }: ProductProps) => {
  const { page, limit } = await searchParams;

  const currentPage = Number(page) || 1;
  const currentLimit = Number(limit) || 20;

  let productsData: ProductApiResponse | null = null;
  try {
    const res = await mainAxios.get(
      `/products?limit=${currentLimit}&skip=${(currentPage - 1) * currentLimit}`
    );
    productsData = res.data;
  } catch (error) {
    console.log("Server fetch error:", error);
    productsData = null;
  }

  return (
    <ProductsPage
      page={currentPage}
      limit={currentLimit}
      initialData={productsData}
    />
  );
};

export default Products;
