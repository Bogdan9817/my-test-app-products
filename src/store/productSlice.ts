import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";
import { Product } from "../classes/Product";

const initialState: {
  list: Product[];
  load: boolean;
  error: string | null;
  productsQty: number;
  searchingItem: Product | null;
} = {
  list: [],
  load: false,
  error: null,
  productsQty: 0,
  searchingItem: null,
};

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const products = await api.get("/products");
  return products.data as Product[];
});

export const fetchProduct = createAsyncThunk(
  "product/fetch",
  async (id: string) => {
    const product = await api.get(`/products/${id}`);
    return product.data as Product;
  }
);

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id: string) => {
    await api.delete(`/products/${id}`);
    return id;
  }
);

export const addProduct = createAsyncThunk(
  "products/add",
  async (p: Product) => {
    const products = await api.post("/products", p);
    return products.data as Product;
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getItem: (state, action) => {
      state.searchingItem = state.list.filter((p) => p.id == action.payload)[0];
    },
  },
  extraReducers: (builder) => {
    // Fetch Products
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.list = action.payload;
      state.productsQty = action.payload.length;
      state.load = false;
    });
    builder.addCase(fetchProducts.pending, (state) => {
      state.error = null;
      state.load = true;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.error = "Something went wrong... try again!";
      state.load = false;
    });
    // Fetch particular product
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.searchingItem = action.payload;
    });
    builder.addCase(fetchProduct.pending, (state) => {
      state.error = null;
      state.load = false;
    });
    builder.addCase(fetchProduct.rejected, (state) => {
      state.error = "Looks like such project doesn`nt exist";
      state.load = false;
    });
    // Add product
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.list = [...state.list, action.payload];
      state.load = false;
    });
    builder.addCase(addProduct.pending, (state) => {
      state.error = null;
      state.load = true;
      state.searchingItem = null;
    });
    builder.addCase(addProduct.rejected, (state) => {
      state.error = "Something went wrong... try again!";
      state.load = false;
    });
    // Delete product
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.list = state.list.filter((p) => p.id !== +action.payload);
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.error = null;
      state.load = true;
      state.searchingItem = null;
    });
    builder.addCase(deleteProduct.rejected, (state) => {
      state.error = "Something went wrong... try again later";
      state.load = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { getItem } = productSlice.actions;

export default productSlice.reducer;
