"use client";
import React from "react";
import ChevronRight from "@svgs/ChevronRight";
import { cn } from "@utils/style";

interface PaginationProps {
  page: number;
  count?: number;
  onChange?: (_e: React.MouseEvent<HTMLButtonElement>, _page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  page = 1,
  count = 1,
  onChange = () => console.log("change page"),
  className = "",
}) => {
  const renderPageNumbers = () => {
    const pages = [];

    if (count <= 8) {
      for (let i = 1; i <= count; i++) {
        pages.push(
          <button
            key={i}
            onClick={(e) => onChange(e, i)}
            className={`min-w-6 px-1 h-6 rounded cursor-pointer ${
              page === i ? "bg-brand text-white" : ""
            }`}
          >
            {i}
          </button>
        );
      }
    } else {
      pages.push(
        <button
          key={1}
          onClick={(e) => onChange(e, 1)}
          className={`min-w-6 px-1 h-6 rounded cursor-pointer ${
            page === 1 ? "bg-brand text-white" : ""
          }`}
        >
          1
        </button>
      );

      if (page > 4) {
        pages.push(<span key="start-dots">...</span>);
      }

      const start = Math.max(2, page - 2);
      const end = Math.min(count - 1, page + 2);

      for (let i = start; i <= end; i++) {
        pages.push(
          <button
            key={i}
            onClick={(e) => onChange(e, i)}
            className={`min-w-6 px-1 h-6 rounded cursor-pointer ${
              page === i ? "bg-brand text-white" : ""
            }`}
          >
            {i}
          </button>
        );
      }

      if (page < count - 3) {
        pages.push(<span key="end-dots">...</span>);
      }

      pages.push(
        <button
          key={count}
          onClick={(e) => onChange(e, count)}
          className={`min-w-6 px-1 h-6 rounded cursor-pointer ${
            page === count ? "bg-brand text-white" : ""
          }`}
        >
          {count}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className={cn("flex items-center", className)}>
      {/* دکمه قبلی (چپ) */}
      <button
        onClick={(e) => onChange(e, page - 1)}
        disabled={page === 1}
        className="px-3 py-1 mx-1 disabled:opacity-50 rotate-180"
      >
        <ChevronRight />
      </button>

      {renderPageNumbers()}

      {/* دکمه بعدی (راست) */}
      <button
        onClick={(e) => onChange(e, page + 1)}
        disabled={page === count}
        className="px-3 py-1 mx-1 disabled:opacity-50"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
