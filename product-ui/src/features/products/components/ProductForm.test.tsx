import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import ProductForm from "./ProductForm";
import type { Product } from "@/types/product";

import {
  createProduct,
  updateProduct,
} from "@/features/serviices/product.service";

// Mock Next.js Router
const mockPush = vi.fn();
const mockRefresh = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    refresh: mockRefresh,
  }),
}));

// Mock API Service
vi.mock("@/features/serviices/product.service", () => ({
  createProduct: vi.fn(),
  updateProduct: vi.fn(),
}));

const mockCreate = vi.mocked(createProduct);
const mockUpdate = vi.mocked(updateProduct);

describe("ProductForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCreate.mockResolvedValue(undefined as never);
    mockUpdate.mockResolvedValue(undefined as never);
  });

  async function fillForm() {
    const user = userEvent.setup();

    await user.type(
      screen.getByLabelText("Product Title"),
      "Gaming Laptop"
    );

    await user.type(
      screen.getByLabelText("Subtitle"),
      "16GB RAM"
    );

    await user.type(
      screen.getByLabelText("Price"),
      "899.99"
    );

    await user.clear(screen.getByLabelText("Stock"));
    await user.type(screen.getByLabelText("Stock"), "10");

    return user;
  }

  it("should render Add Product form", () => {
    render(<ProductForm />);

    expect(
      screen.getByRole("heading", { name: "Add Product" })
    ).toBeInTheDocument();

    expect(screen.getByLabelText("Product Title"))
      .toBeInTheDocument();

    expect(screen.getByLabelText("Price"))
      .toBeInTheDocument();

    expect(screen.getByLabelText("Stock"))
      .toBeInTheDocument();
  });

  it("should create a product successfully", async () => {
    render(<ProductForm />);

    const user = await fillForm();

    await user.click(
      screen.getByRole("button", { name: "Save Product" })
    );

    await waitFor(() => {
      expect(mockCreate).toHaveBeenCalledWith({
        title: "Gaming Laptop",
        subtitle: "16GB RAM",
        image: "",
        price: 899.99,
        stock: 10,
      });
    });

    expect(mockPush).toHaveBeenCalledWith("/");
    expect(mockRefresh).toHaveBeenCalled();
  });

  it("should update an existing product", async () => {
    const product: Product = {
      id: "product-123",
      title: "Old Laptop",
      subtitle: "8GB RAM",
      image: "",
      price: 500,
      category: "Electronics",
      stock: 5,
      createdAt: "2026-11-20T10:00:00",
    };

    render(<ProductForm product={product} />);

    expect(screen.getByLabelText("Product Title"))
      .toHaveValue("Old Laptop");

    const user = userEvent.setup();

    await user.clear(screen.getByLabelText("Product Title"));
    await user.type(
      screen.getByLabelText("Product Title"),
      "Updated Laptop"
    );

    await user.click(
      screen.getByRole("button", { name: "Save Product" })
    );

    await waitFor(() => {
      expect(mockUpdate).toHaveBeenCalledWith(
        "product-123",
        expect.objectContaining({
          title: "Updated Laptop",
          price: 500,
          stock: 5,
        })
      );
    });

    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("should reject a negative price", async () => {
    render(<ProductForm />);

    const user = userEvent.setup();

    await user.type(
      screen.getByLabelText("Product Title"),
      "Gaming Laptop"
    );

    fireEvent.change(screen.getByLabelText("Price"), {
      target: { value: "-10" },
    });

    fireEvent.submit(
      screen.getByRole("button", { name: "Save Product" })
        .closest("form")!
    );

    expect(await screen.findByRole("alert"))
      .toHaveTextContent(
        "Please enter valid product information."
      );

    expect(mockCreate).not.toHaveBeenCalled();
  });

  it("should reject a negative stock", async () => {
    render(<ProductForm />);

    fireEvent.change(screen.getByLabelText("Product Title"), {
      target: { value: "Gaming Laptop" },
    });

    fireEvent.change(screen.getByLabelText("Price"), {
      target: { value: "100" },
    });

    fireEvent.change(screen.getByLabelText("Stock"), {
      target: { value: "-5" },
    });

    fireEvent.submit(
      screen.getByRole("button", { name: "Save Product" })
        .closest("form")!
    );

    expect(await screen.findByRole("alert"))
      .toHaveTextContent(
        "Please enter valid product information."
      );

    expect(mockCreate).not.toHaveBeenCalled();
  });

  it("should display an error when API fails", async () => {
    mockCreate.mockRejectedValue(
      new Error("Server unavailable")
    );

    render(<ProductForm />);

    const user = await fillForm();

    await user.click(
      screen.getByRole("button", { name: "Save Product" })
    );

    expect(await screen.findByRole("alert"))
      .toHaveTextContent("Server unavailable");

    expect(mockPush).not.toHaveBeenCalled();
  });
});