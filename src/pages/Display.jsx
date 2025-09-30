import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Display() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		setProducts(JSON.parse(localStorage.getItem("products") || "[]"));
	}, []);

	const deleteProduct = (id) => {
		const updatedProducts = products.filter((product) => product.id !== id);
		localStorage.setItem("products", JSON.stringify(updatedProducts));
		setProducts(updatedProducts);
	};

	return (
		<>
			<h1 className="text-center my-3">Welcome to Ecommerce Website</h1>

			<div className="container">
				<div className="row">
					{products.length !== 0 &&
						products.map((product, index) => (
							<div className="col-md-4" key={index}>
								<div className="card mb-4">
									<img
										src={product.productImageUrl}
										className="card-img-top"
										alt={product.productName}
									/>
									<div className="card-body">
										<h5 className="card-title">
											{product.productName}
										</h5>
										<p className="card-text">
											${product.productPrice}
										</p>
										<p className="card-text">
											{product.productDescription}
										</p>
										<span className="badge text-bg-secondary fs-6 me-2 mb-3">
											{product.productSize}
										</span>
										<span className="badge text-bg-secondary fs-6 mb-3">
											{product.productColor}
										</span>
										<div className="d-flex justify-content-between align-items-center">
											<Link
												to={`/editProduct/${product.id}`}
												className="btn btn-primary"
											>
												Edit Product
											</Link>
											<button
												className="btn btn-danger"
												onClick={() =>
													deleteProduct(product.id)
												}
											>
												Delete Product
											</button>
										</div>
									</div>
								</div>
							</div>
						))}
					{products.length === 0 && (
						<p className="text-center my-5 fs-5">
							No Products Available. Please add some products.
						</p>
					)}
				</div>
			</div>
		</>
	);
}
