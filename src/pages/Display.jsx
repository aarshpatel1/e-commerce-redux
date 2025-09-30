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

	const handleSearch = (e) => {
		e.preventDefault();
		const form = e.target;
		const query = form[0].value.toLowerCase();
		const colorFilter = form[1].value;
		const sizeFilter = form[2].value;
		const allProducts = JSON.parse(
			localStorage.getItem("products") || "[]"
		);
		const filteredProducts = allProducts.filter((product) => {
			const matchesQuery =
				product.productName.toLowerCase().includes(query) ||
				product.productDescription.toLowerCase().includes(query);
			const matchesColor = colorFilter
				? product.productColor === colorFilter
				: true;
			const matchesSize = sizeFilter
				? product.productSize === sizeFilter
				: true;
			return matchesQuery && matchesColor && matchesSize;
		});
		setProducts(filteredProducts);
	};

	return (
		<>
			<h1 className="text-center my-3">Welcome to Ecommerce Website</h1>

			<div className="container" onSubmit={handleSearch}>
				<form className="d-flex mb-4 justify-content-end" role="search">
					<input
						type="text"
						className="form-control me-2 w-25"
						placeholder="Search Products"
						aria-label="Search"
					/>
					<select
						name="filter"
						id="filter"
						className="form-select me-2 w-25"
					>
						<option value="">Choose Colors</option>
						<option value="red">Red</option>
						<option value="green">Green</option>
						<option value="blue">Blue</option>
					</select>

					<select
						name="size"
						id="size"
						className="form-select me-2 w-25"
					>
						<option value="">Choose Sizes</option>
						<option value="xl">XL</option>
						<option value="xxl">XXL</option>
						<option value="xxxl">XXXL</option>
					</select>

					<button className="btn btn-outline-secondary" type="submit">
						Search
					</button>
				</form>

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
