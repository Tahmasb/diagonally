import SortableHeader from "./SortableHeader";
import ProductRow from "./ProductRow";

interface ProductsTableProps {
  products: {
    id: number;
    title: string;
    stock: number;
    price: number;
    brand?: string;
    category: string;
  }[];
  sortField: "stock" | "price" | null;
  sortOrder: "asc" | "desc";
  onSort: (field: "stock" | "price") => void;
}

const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  sortField,
  sortOrder,
  onSort,
}) => {
  return (
    <div className="overflow-auto w-full">
      <table className="w-full border-collapse">
        <thead>
          <tr className="table-row-custom bg-gray-100">
            <th className="px-2 py-1 text-left">id</th>
            <th className="px-2 py-1 text-left">title</th>
            <SortableHeader
              field="stock"
              sortField={sortField}
              sortOrder={sortOrder}
              onClick={onSort}
            >
              stock
            </SortableHeader>
            <SortableHeader
              field="price"
              sortField={sortField}
              sortOrder={sortOrder}
              onClick={onSort}
            >
              price
            </SortableHeader>
            <th className="px-2 py-1 text-left">brand</th>
            <th className="px-2 py-1 text-left">category</th>
            <th className="px-2 py-1 text-left">details</th>
          </tr>
        </thead>
        <tbody>
          {products.map(({ id, title, stock, price, brand, category }) => (
            <ProductRow
              key={id}
              id={id}
              title={title}
              stock={stock}
              price={price}
              brand={brand}
              category={category}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
