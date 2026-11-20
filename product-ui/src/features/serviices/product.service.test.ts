import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";

import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./product.service";

import { API_URL, SERVER_API_URL } from "@/lib/api";
import type { Product, ProductRequest } from "@/types/product";

const product: Product = {
  id: "product-123",
  title: "Gaming Laptop",
  subtitle: "16GB RAM",
  image: "https://example.com/laptop.jpg",
  price: 899.99,
  category: "Electronics",
  stock: 10,
  createdAt: "2026-11-20T10:00:00",
};

const request: ProductRequest = {
  title: "Gaming Laptop",
  subtitle: "16GB RAM",
  image: "https://example.com/laptop.jpg",
  price: 899.99,
  stock: 10,
};

describe("Product API Service", () => {
  const mockFetch = vi.fn<typeof fetch>();

  beforeEach(() => {
    mockFetch.mockReset();
    vi.stubGlobal("fetch", mockFetch);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("should get all products", async () => {
    mockFetch.mockResolvedValue(
      new Response(JSON.stringify([product]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    const result = await getProducts();

    expect(result).toEqual([product]);
    expect(mockFetch).toHaveBeenCalledWith(
      `${SERVER_API_URL}/api/products`,
      { cache: "no-store" }
    );
  });

  it("should get product by ID", async () => {
    mockFetch.mockResolvedValue(
      new Response(JSON.stringify(product), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    const result = await getProduct("product-123");

    expect(result).toEqual(product);
    expect(mockFetch).toHaveBeenCalledWith(
      `${SERVER_API_URL}/api/products/product-123`,
      { cache: "no-store" }
    );
  });

  it("should create product with POST", async () => {
    mockFetch.mockResolvedValue(
      new Response(JSON.stringify(product), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      })
    );

    const result = await createProduct(request);

    expect(result).toEqual(product);
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/api/products`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      }
    );
  });

  it("should update product with PATCH", async () => {
    const update = { price: 799.99 };

    mockFetch.mockResolvedValue(
      new Response(JSON.stringify({ ...product, ...update }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );

    const result = await updateProduct("product-123", update);

    expect(result.price).toBe(799.99);
    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/api/products/product-123`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(update),
      }
    );
  });

  it("should delete product successfully", async () => {
    mockFetch.mockResolvedValue(
      new Response(null, { status: 204 })
    );

    await expect(
      deleteProduct("product-123")
    ).resolves.toBeUndefined();

    expect(mockFetch).toHaveBeenCalledWith(
      `${API_URL}/api/products/product-123`,
      { method: "DELETE" }
    );
  });

  it("should throw error when DELETE fails", async () => {
    mockFetch.mockResolvedValue(
      new Response(null, { status: 500 })
    );

    await expect(
      deleteProduct("product-123")
    ).rejects.toThrow("Failed to delete product");
  });

  it("should throw error when GET fails", async () => {
    mockFetch.mockResolvedValue(
      new Response(
        JSON.stringify({ message: "Product not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      )
    );

    await expect(
      getProduct("invalid-id")
    ).rejects.toThrow();
  });
});