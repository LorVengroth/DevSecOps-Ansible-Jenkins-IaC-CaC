import ProductForm from "@/features/products/components/ProductForm";
import { getProduct } from "@/features/serviices/product.service";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <main className="p-8">
      <ProductForm product={product} />
    </main>
  );
}