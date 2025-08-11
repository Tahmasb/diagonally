type SortField = "stock" | "price";

interface SortableHeaderProps {
  children: React.ReactNode;
  field: SortField;
  sortField: SortField | null;
  sortOrder: "asc" | "desc";
  onClick: (field: SortField) => void;
}

const SortableHeader: React.FC<SortableHeaderProps> = ({
  children,
  field,
  sortField,
  sortOrder,
  onClick,
}) => {
  const defaultArrow = "⇅";

  return (
    <th
      className="cursor-pointer select-none px-2 py-1 text-left
        hover:text-blue-600 transition-colors duration-200 relative"
      onClick={() => onClick(field)}
      title="برای مرتب‌سازی کلیک کنید"
      style={{ userSelect: "none" }}
    >
      <span className="inline-flex items-center gap-1">
        {children}
        <span
          className={`inline-block text-sm ${
            sortField === field ? "text-blue-600" : "text-gray-400"
          }`}
        >
          {sortField === field
            ? sortOrder === "asc"
              ? "↑"
              : "↓"
            : defaultArrow}
        </span>
      </span>
    </th>
  );
};

export default SortableHeader;
