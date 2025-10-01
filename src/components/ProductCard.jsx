import { Link } from "react-router";

export default function ProductCard({ product, handleDelete }) {
	return (
		<div className="card mb-4">
			<img
				src={product.productImageUrl}
				className="card-img-top"
				alt={product.productName}
			/>
			<div className="card-body">
				<h5 className="card-title">{product.productName}</h5>
				<p className="card-text">${product.productPrice}</p>
				<p className="card-text">{product.productDescription}</p>
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
						onClick={() => handleDelete(product.id)}
					>
						Delete Product
					</button>
				</div>
			</div>
		</div>
	);
}
