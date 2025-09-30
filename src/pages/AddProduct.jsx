import { useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function AddProduct() {
	const productId = useParams().id;
	const navigate = useNavigate();

	const [product, setProduct] = useState({});

	if (productId) {
		const products = JSON.parse(localStorage.getItem("products") || "[]");
		const existingProduct = products.find(
			(p) => p.id === parseInt(productId)
		);
		if (existingProduct && !product.productName) {
			setProduct(existingProduct);
		}
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		setProduct({ ...product, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (productId) {
			const products = JSON.parse(
				localStorage.getItem("products") || "[]"
			);
			const updatedProducts = products.map((p) =>
				p.id === parseInt(productId) ? { ...product, id: p.id } : p
			);
			localStorage.setItem("products", JSON.stringify(updatedProducts));
			setProduct({});
			navigate("/");
			return;
		}

		const updatedProduct = { ...product, id: Date.now() };
		localStorage.setItem(
			"products",
			JSON.stringify([
				...JSON.parse(localStorage.getItem("products") || "[]"),
				updatedProduct,
			])
		);
		setProduct({});
		navigate("/");
	};

	return (
		<>
			<h1 className="text-center my-3">Add Product</h1>
			<form className="w-50 mx-auto" onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="productName" className="form-label">
						Product Name
					</label>
					<input
						type="text"
						className="form-control"
						id="productName"
						name="productName"
						value={product.productName || ""}
						onChange={handleChange}
					/>
				</div>

				<div className="mb-3">
					<label htmlFor="productImageUrl" className="form-label">
						Product Image URL
					</label>
					<input
						type="url"
						className="form-control"
						id="productImageUrl"
						name="productImageUrl"
						value={product.productImageUrl || ""}
						onChange={handleChange}
					/>
					{product.productImageUrl && (
						<img
							src={product.productImageUrl}
							alt={product.productName || "Product"}
                            width={300}
                            className="mt-3 rounded"
						/>
					)}
				</div>
				<div className="mb-3">
					<label htmlFor="productPrice" className="form-label">
						Product Price
					</label>
					<input
						type="number"
						className="form-control"
						id="productPrice"
						name="productPrice"
						value={product.productPrice || 0}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="productDescription" className="form-label">
						Product Description
					</label>
					<textarea
						name="productDescription"
						id="productDescription"
						className="form-control"
						value={product.productDescription || ""}
						onChange={handleChange}
					></textarea>
				</div>
				<div className="mb-3">
					<label htmlFor="productSize" className="form-label">
						Product Size
					</label>
					<select
						name="productSize"
						id="productSize"
						className="form-select"
						value={product.productSize || ""}
						onChange={handleChange}
					>
						<option value="">Choose the Product Size</option>
						<option value="xl">XL</option>
						<option value="xxl">XXL</option>
						<option value="xxxl">XXXL</option>
					</select>
				</div>
				<div className="mb-3">
					<label htmlFor="productColor" className="form-label">
						Product Color
					</label>
					<select
						name="productColor"
						id="productColor"
						className="form-select"
						value={product.productColor || ""}
						onChange={handleChange}
					>
						<option value="">Choose the Product Color</option>
						<option value="red">Red</option>
						<option value="green">Green</option>
						<option value="blue">Blue</option>
					</select>
				</div>
				<button type="submit" className="btn btn-primary">
					{productId ? "Update Product" : "Add Product"}
				</button>
			</form>
		</>
	);
}
