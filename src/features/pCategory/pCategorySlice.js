import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import pCategoryService from "./pCategoryService";

const initialState = {
  pCategory: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getProductsCategory = createAsyncThunk(
  "pCategory/get-pCategory",
  async (user, thunkAPI) => {
    try {
      return await pCategoryService.getProductsCategory();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const createProductsCategory = createAsyncThunk(
  "pCategory/create-pCategory",
  async (data, thunkAPI) => {
    try {
      return await pCategoryService.createProductsCategory(data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const pCategorySlice = createSlice({
  name: "pCategory",
  initialState,
  reducers: {
    RESET_PCategory(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // Get Product Category
    builder
      .addCase(getProductsCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductsCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.pCategory = action.payload;
        //console.log(state.customers);
      })
      .addCase(getProductsCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.pCategory = null;
      }) // Create Product Category
      .addCase(createProductsCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProductsCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.pCategory = action.payload;
        //console.log(state.customers);
      })
      .addCase(createProductsCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.pCategory = null;
      });
  },
});

export const { RESET_PCategory } = pCategorySlice.actions;
export default pCategorySlice.reducer;
