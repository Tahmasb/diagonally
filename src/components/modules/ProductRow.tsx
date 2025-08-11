import Link from "next/link";
import Eye from "@svgs/Eye";

interface ProductRowProps {
  id: number;
  title: string;
  stock: number;
  price: number;
  brand?: string;
  category: string;
}

const ProductRow: React.FC<ProductRowProps> = ({
  id,
  title,
  stock,
  price,
  brand,
  category,
}) => {
  return (
    <tr className="table-row-custom hover:bg-gray-50 transition-colors duration-150 *:px-2 *:py-1">
      <td>{id}</td>
      <td className="whitespace-nowrap max-w-32 lg:max-w-96 overflow-hidden text-ellipsis ">
        {title}
      </td>
      <td>{stock}</td>
      <td>{price}</td>
      <td className="whitespace-nowrap max-w-40 lg:max-w-96 overflow-hidden text-ellipsis ">
        {brand || "_"}
      </td>
      <td className="whitespace-nowrap max-w-40 lg:max-w-96 overflow-hidden text-ellipsis ">
        {category}
      </td>
      <td>
        <Link
          title="product details"
          href={`/products/${id}`}
          className="flex justify-center items-center"
        >
          <Eye />
        </Link>
      </td>
    </tr>
  );
};

export default ProductRow;
