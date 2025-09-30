import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
	name: "products",
	initialState: {
		products: [],
	},
	reducers: {
		setProducts: (state, action) => {
			state.products = action.payload;
		},
		addProduct: (state, action) => {
			state.products.push(action.payload);
		},
		updateProduct: (state, action) => {
			const index = state.products.findIndex(
				(product) => product.id === action.payload.id
			);
			if (index !== -1) {
				state.products[index] = action.payload;
			}
		},
		deleteProduct: (state, action) => {
			state.products = state.products.filter(
				(product) => product.id !== action.payload
			);
		},
	},
});

export const { setProducts, addProduct, updateProduct, deleteProduct } =
	productSlice.actions;

export default productSlice.reducer;
