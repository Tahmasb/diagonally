"use client";

import { useState, useMemo, useTransition } from "react";
import { useRouter } from "next/navigation";
import ProductsTable from "@modules/ProductsTable";
import { ProductApiResponse } from "src/types/Product";
import Pagination from "@elements/Pagination";
import Loading from "@elements/Loading";

type ProductPageProps = {
  page: number;
  limit: number;
  initialData: ProductApiResponse | null;
};

const ProductsPage: React.FC<ProductPageProps> = ({
  page,
  limit,
  initialData,
}) => {
  const [productsData] = useState<ProductApiResponse | null>(initialData);
  const [sortField, setSortField] = useState<"stock" | "price" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

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

  if (!productsData) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <span className="text-red-500">
          There was a problem retrieving the products. Please try again later or
          check net connection.
        </span>
      </div>
    );
  }

  const totalPages = Math.ceil((productsData.total || 0) / limit);

  return (
    <div className="flex flex-col max-w-[1700px] mx-auto w-full gap-9 p-4 my-6 items-center h-[92vh] justify-between ">
      <h1 className="heading">products list</h1>

      {isPending ? (
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
            startTransition(() => {
              router.push(`/products?page=${newPage}&limit=${limit}`);
            });
          }}
        />
      )}
    </div>
  );
};

export default ProductsPage;
