// const API_URL = "https://crud-ae-tech-interns-vzuj.vercel.app/api/products";

// export type Product = {
//   id: number;
//   name: string;
//   description?: string;
//   price: number;
//   stock?: number;
// };

// export async function fetchProducts(): Promise<Product[]> {
//   const response = await fetch(API_URL);
//   return response.json();
// }

// export async function addProduct(product: Omit<Product, "id">): Promise<void> {
//   const response = await fetch(API_URL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(product),
//   });
//   return response.json();
// }

// export async function deleteProduct(id: string) {
//   await fetch(`${API_URL}/${id}`, { method: "DELETE" });
// }
