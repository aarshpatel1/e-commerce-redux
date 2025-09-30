import { BrowserRouter, Route, Routes } from "react-router";

import Display from "./pages/Display";
import AddProduct from "./pages/AddProduct";
import Navbar from "./components/Navbar";

export default function App() {
	return (
		<>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Display />} />
					<Route path="/addProduct" element={<AddProduct />} />
					<Route path="/editProduct/:id" element={<AddProduct />} />
					<Route path="/deleteProduct/:id" element={<Display />} />
					<Route
						path="*"
						element={
							<h1 className="text-center my-5">404 Not Found</h1>
						}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}
