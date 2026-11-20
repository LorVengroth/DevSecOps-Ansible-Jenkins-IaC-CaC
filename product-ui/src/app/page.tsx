import Link from "next/link";

import ProductList from "@/features/products/components/ProductList";
import { getProducts } from "@/features/serviices/product.service";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

        {/* Page Title */}
        <div className="min-w-0">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Product Management
          </h1>
          <p className="mt-2 text-slate-500">
            Manage your products
          </p>
        </div>

        {/* Add Product Button */}
        <Link
          href="/products/new"
          className="inline-flex shrink-0 items-center justify-center gap-2 self-start whitespace-nowrap rounded-xl bg-blue-600 px-5 py-3 font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md sm:self-auto"
        >
          <span className="text-xl leading-none">+</span>
          Add Product
        </Link>

      </div>

      <ProductList products={products} />
    </main>
  );
}