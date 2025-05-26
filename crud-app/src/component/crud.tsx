import { useState, useEffect } from "react";
import type { Product } from "./api.ts";
import {
  fetchProducts,
  addProduct,
  deleteProduct,
  updateProduct,
} from "./api.ts";

export default function CrudApp() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: 0 });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };

  const handleAdd = async () => {
    if (!newProduct.name.trim() || newProduct.price <= 0) return;
    setLoading(true);
    await addProduct(newProduct);
    setNewProduct({ name: "", price: 0 });
    setLoading(false);
    loadProducts();
  };

  const handleDelete = (id: string) => {
    setConfirmDelete(id);
  };

  const confirmDeletion = async () => {
    if (confirmDelete) {
      setDeleting(true);
      await deleteProduct(confirmDelete);
      setDeleting(false);
      setConfirmDelete(null);
      loadProducts();
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleUpdate = async () => {
    if (editingProduct) {
      setUpdating(true);
      await updateProduct(editingProduct.id, {
        name: editingProduct.name,
        price: editingProduct.price,
      });
      setUpdating(false);
      setEditingProduct(null);
      loadProducts();
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg transition-all duration-300 font-Poppins">
      <h1 className="text-2xl font-bold mb-4 text-blue-600 text-center">
        Product CRUD App
      </h1>

      {/* Add or Edit Product Form */}
      <div className="mb-6 p-4 border-b-4 border-blue-600">
        <input
          type="text"
          value={editingProduct ? editingProduct.name : newProduct.name}
          onChange={(e) =>
            editingProduct
              ? setEditingProduct({ ...editingProduct, name: e.target.value })
              : setNewProduct({ ...newProduct, name: e.target.value })
          }
          className="border p-2 rounded w-full transition-all duration-200 focus:outline-blue-500"
          placeholder="Product Name"
        />
        <input
          type="number"
          value={editingProduct ? editingProduct.price : newProduct.price}
          onChange={(e) =>
            editingProduct
              ? setEditingProduct({
                  ...editingProduct,
                  price: parseFloat(e.target.value),
                })
              : setNewProduct({
                  ...newProduct,
                  price: parseFloat(e.target.value),
                })
          }
          className="border p-2 rounded w-full mt-2 transition-all duration-200 focus:outline-blue-500"
          placeholder="Price"
        />
        {editingProduct ? (
          <button
            onClick={handleUpdate}
            className="mt-3 bg-yellow-500 text-white px-4 py-2 rounded transition-all duration-200 cursor-pointer hover:bg-yellow-700 hover:translate-y-1"
          >
            {updating ? "Updating..." : "Update Product"}
          </button>
        ) : (
          <button
            onClick={handleAdd}
            className="mt-3 bg-blue-500 text-white px-4 py-2 rounded transition-all duration-200 cursor-pointer hover:bg-blue-700 hover:translate-y-1"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        )}
      </div>

      {/* Product Table */}
      <div className="overflow-hidden rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-3 text-left">Product Name</th>
              <th className="p-3 text-left">Price ($)</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-blue-100 transition-all duration-200"
              >
                <td className="p-3">{product.name}</td>
                <td className="p-3">${product.price.toFixed(2)}</td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-yellow-500 hover:text-yellow-700 transition-all duration-200 cursor-pointer mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-500 hover:text-red-700 transition-all duration-200 cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 flex justify-center items-center bg-white/5 bg-opacity-50 backdrop-blur-xs transition-all duration-300">
          <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-xl text-center transform transition-all duration-300 scale-100">
            <p className="text-lg font-semibold mb-4">
              {deleting ? "Deleting..." : "Are you sure you want to delete?"}
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmDeletion}
                className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300"
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                onClick={() => setConfirmDelete(null)}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
