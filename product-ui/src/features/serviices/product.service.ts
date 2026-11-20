import {
  Product,
  ProductRequest,
  ProductUpdate,
} from "@/types/product";

import {
  API_URL,
  SERVER_API_URL,
  handleResponse,
} from "@/lib/api";

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(
    `${SERVER_API_URL}/api/products`,
    { cache: "no-store" }
  );

  return handleResponse<Product[]>(response);
}

export async function getProduct(id: string): Promise<Product> {
  const response = await fetch(
    `${SERVER_API_URL}/api/products/${id}`,
    { cache: "no-store" }
  );

  return handleResponse<Product>(response);
}

export async function createProduct(
  data: ProductRequest
): Promise<Product> {
  const response = await fetch(`${API_URL}/api/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse<Product>(response);
}

export async function updateProduct(
  id: string,
  data: ProductUpdate
): Promise<Product> {
  const response = await fetch(
    `${API_URL}/api/products/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return handleResponse<Product>(response);
}

export async function deleteProduct(
  id: string
): Promise<void> {
  const response = await fetch(
    `${API_URL}/api/products/${id}`,
    { method: "DELETE" }
  );

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }
}