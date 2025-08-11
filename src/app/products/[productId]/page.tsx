"use client";

import { mainAxios } from "@utils/axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "src/types/Product";
import Image from "next/image";
import Loading from "@elements/Loading";

const ProductDetails: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState<Product>();
  const { productId } = useParams();

  const router = useRouter();

  useEffect(() => {
    mainAxios(`/products/${productId}`)
      .then((res) => {
        setProductData(res.data);
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId]);

  if (loading) return <Loading />;

  if (!productData) {
    return (
      <div className="text-center py-20 text-gray-500">
        product not found
        <div className="mt-4">
          <span
            onClick={() => router.back()}
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            back to product list
          </span>
        </div>
      </div>
    );
  }

  const {
    title,
    brand,
    category,
    description,
    price,
    rating,
    discountPercentage,
    availabilityStatus,
    images,
    stock,
    tags,
  } = productData;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <span
        onClick={() => router.back()}
        className="inline-block mb-6 text-brand cursor-pointer hover:underline"
      >
        back to products
      </span>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-gray-100 flex items-center justify-center">
            <Image
              width={300}
              height={300}
              src={images?.[0] || "/placeholder.png"}
              alt={title}
              className="object-cover w-full h-full max-h-[500px]"
            />
          </div>

          <div className="p-6 flex flex-col">
            <h1 className="text-2xl font-bold mb-2">{title}</h1>
            <p className="text-sm text-gray-500 mb-4">
              {brand} • {category}
            </p>
            <p className="text-gray-700 mb-6">{description}</p>

            <div className="mb-6">
              <div className="text-3xl font-bold">{price} $</div>
              {discountPercentage && (
                <div className="text-red-500 text-sm">
                  {Math.round(discountPercentage)}% discount
                </div>
              )}
            </div>
            <div className="flex items-center gap-4 mb-6">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  availabilityStatus === "In Stock"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {availabilityStatus}
              </span>
              <span className="text-yellow-500 font-medium">⭐ {rating}</span>
              <span className="text-gray-500 text-sm">Inventory: {stock}</span>
            </div>

            {tags && tags.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <button className="mt-auto bg-red-500 hover:opacity-90 cursor-pointer text-white py-3 rounded-lg transition">
              Add To Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
