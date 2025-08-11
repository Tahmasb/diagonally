"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { mainAxios } from "@utils/axios";
import ProductsTable from "@modules/ProductsTable";
import { ProductApiResponse } from "src/types/Product";
import Pagination from "@elements/Pagination";
import Loading from "@elements/Loading";

type ProductPageProps = { page: number; limit: number };

const ProductsPage: React.FC<ProductPageProps> = ({ page, limit }) => {
  const [productsData, setProductsData] = useState<ProductApiResponse>();
  const [isError, setIsError] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(true);

  const [sortField, setSortField] = useState<"stock" | "price" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const router = useRouter();

  useEffect(() => {
    setIsLoadingPage(true);
    mainAxios(`/products?limit=${limit}&skip=${(page - 1) * limit}`)
      .then((res) => {
        setProductsData(res.data);
        setIsError(false);
      })
      .catch((error) => {
        console.log(error.response || error);
        setIsError(true);
      })
      .finally(() => setIsLoadingPage(false));
  }, [page, limit]);

  const sortedProducts = useMemo(() => {
    if (!productsData?.products) return [];
    const sorted = [...productsData.products];
    if (sortField) {
      sorted.sort((a, b) => {
        if (sortOrder === "asc") {
          return a[sortField] - b[sortField];
        } else {
          return b[sortField] - a[sortField];
        }
      });
    }
    return sorted;
  }, [productsData, sortField, sortOrder]);

  const handleSort = (field: "stock" | "price") => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const totalPages = Math.ceil((productsData?.total || 0) / limit);

  return (
    <div className="flex flex-col gap-9 p-4 my-6 items-center h-[92vh] justify-between ">
      <h1 className="heading">products list</h1>

      {isError && (
        <span className="text-center">
          There was a problem retrieving the products. Please try again later
        </span>
      )}

      {isLoadingPage ? (
        <Loading />
      ) : (
        <ProductsTable
          products={sortedProducts}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
        />
      )}

      {totalPages > 1 && (
        <Pagination
          page={page}
          count={totalPages}
          onChange={(e, newPage) => {
            router.push(`/products?page=${newPage}&limit=${limit}`);
          }}
        />
      )}
    </div>
  );
};

export default ProductsPage;
