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
				</Routes>
			</BrowserRouter>
		</>
	);
}
