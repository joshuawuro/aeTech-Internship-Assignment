const API_URL = "https://crud-ae-tech-interns-vzuj.vercel.app/api/products";

export type Product = {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock?: number;
};

//fetch products fom backend
export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(API_URL);
  console.log(response);
  return response.json();
}

//add new products to database
export async function addProduct(
  product: Omit<Product, "id">
): Promise<Product> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  console.log(response);
  return response.json();
}

//delete product from database
export async function deleteProduct(id: string): Promise<void> {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}

//update product form database
export async function updateProduct(
  id: string,
  updatedData: Partial<Product>
): Promise<Product> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });

  return response.json();
}
