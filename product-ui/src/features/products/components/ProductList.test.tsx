import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import ProductList from "./ProductList";
import type { Product } from "@/types/product";
import { deleteProduct } from "@/features/serviices/product.service";

const { mockRefresh } = vi.hoisted(() => ({
  mockRefresh: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: mockRefresh,
  }),
}));

vi.mock("@/features/serviices/product.service", () => ({
  deleteProduct: vi.fn(),
}));

vi.mock("./ProductCard", () => ({
  default: ({
    product,
    onDelete,
  }: {
    product: Product;
    onDelete: (id: string) => void;
  }) => (
    <div>
      <h2>{product.title}</h2>
      <button onClick={() => onDelete(product.id)}>
        Delete {product.title}
      </button>
    </div>
  ),
}));

const mockDelete = vi.mocked(deleteProduct);

const products: Product[] = [
  {
    id: "product-1",
    title: "Gaming Laptop",
    subtitle: "16GB RAM",
    image: "",
    price: 899.99,
    category: "Electronics",
    stock: 10,
    createdAt: "2026-11-20T10:00:00",
  },
  {
    id: "product-2",
    title: "Wireless Mouse",
    subtitle: "Bluetooth",
    image: "",
    price: 29.99,
    category: "Electronics",
    stock: 20,
    createdAt: "2026-11-20T10:00:00",
  },
];

describe("ProductList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("confirm", vi.fn(() => true));
    mockDelete.mockResolvedValue(undefined as never);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("should display all products", () => {
    render(<ProductList products={products} />);

    expect(screen.getByText("Gaming Laptop")).toBeInTheDocument();
    expect(screen.getByText("Wireless Mouse")).toBeInTheDocument();
  });

  it("should show empty message when no products exist", () => {
    render(<ProductList products={[]} />);

    expect(screen.getByText("No products found."))
      .toBeInTheDocument();
  });

  it("should filter products by title", async () => {
    const user = userEvent.setup();

    render(<ProductList products={products} />);

    await user.type(
      screen.getByPlaceholderText("Search products..."),
      "LAPTOP"
    );

    expect(screen.getByText("Gaming Laptop")).toBeInTheDocument();
    expect(screen.queryByText("Wireless Mouse"))
      .not.toBeInTheDocument();
  });

  it("should not delete when confirmation is cancelled", async () => {
    vi.stubGlobal("confirm", vi.fn(() => false));

    const user = userEvent.setup();

    render(<ProductList products={products} />);

    await user.click(
      screen.getByRole("button", { name: "Delete Gaming Laptop" })
    );

    expect(mockDelete).not.toHaveBeenCalled();
    expect(mockRefresh).not.toHaveBeenCalled();
  });

  it("should delete product and refresh page", async () => {
    const user = userEvent.setup();

    render(<ProductList products={products} />);

    await user.click(
      screen.getByRole("button", { name: "Delete Gaming Laptop" })
    );

    await waitFor(() => {
      expect(mockDelete).toHaveBeenCalledWith("product-1");
      expect(mockRefresh).toHaveBeenCalledTimes(1);
    });
  });

  it("should display error when delete API fails", async () => {
    mockDelete.mockRejectedValue(new Error("Delete failed"));

    const user = userEvent.setup();

    render(<ProductList products={products} />);

    await user.click(
      screen.getByRole("button", { name: "Delete Gaming Laptop" })
    );

    expect(await screen.findByRole("alert"))
      .toHaveTextContent("Delete failed");

    expect(mockRefresh).not.toHaveBeenCalled();
  });
});