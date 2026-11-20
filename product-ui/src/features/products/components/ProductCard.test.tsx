import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ProductCard from "./ProductCard";
import type { Product } from "@/types/product";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => <a href={href}>{children}</a>,
}));

describe("ProductCard", () => {
  const product: Product = {
    id: "123",
    image: "https://example.com/product.jpg",
    title: "Gaming Laptop",
    subtitle: "16GB RAM",
    price: 899.99,
    category: "Electronics",
    stock: 10,
    createdAt: "2026-11-20T10:00:00",
  };

  it("should display product information", () => {
    render(
      <ProductCard product={product} onDelete={vi.fn()} />
    );

    expect(screen.getByText("Gaming Laptop")).toBeInTheDocument();
    expect(screen.getByText("16GB RAM")).toBeInTheDocument();
    expect(screen.getByText("$899.99")).toBeInTheDocument();
    expect(screen.getByText("Stock: 10")).toBeInTheDocument();
  });

  it("should display edit link", () => {
    render(
      <ProductCard product={product} onDelete={vi.fn()} />
    );

    expect(screen.getByRole("link", { name: "Edit" }))
      .toHaveAttribute("href", "/products/123/edit");
  });

  it("should call onDelete when delete button is clicked", () => {
    const handleDelete = vi.fn();

    render(
      <ProductCard product={product} onDelete={handleDelete} />
    );

    fireEvent.click(screen.getByRole("button", { name: "Delete" }));

    expect(handleDelete).toHaveBeenCalledWith("123");
    expect(handleDelete).toHaveBeenCalledTimes(1);
  });
});