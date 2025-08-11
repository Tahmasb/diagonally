import ProductsPage from "@pages/ProductsPage";

type ProductProps = {
  searchParams: Promise<{ page: string; limit: string }>;
};

const Products = async ({ searchParams }: ProductProps) => {
  const { page, limit } = await searchParams;
  return <ProductsPage page={Number(page) || 1} limit={Number(limit) || 10} />;
};

export default Products;
