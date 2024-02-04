import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import pCategoryService from "./pCategoryService";
import { toast } from "react-toastify";

const initialState = {
  pCategory: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getProductsCategory = createAsyncThunk(
  "pCategory/get-pCategory",
  async (thunkAPI) => {
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
export const getProductCategory = createAsyncThunk(
  "pCategory/get-a-pCategory",
  async (id, thunkAPI) => {
    try {
      return await pCategoryService.getProductCategory(id);
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
export const updateProductsCategory = createAsyncThunk(
  "pCategory/update-pCategory",
  async (payload, thunkAPI) => {
    try {
      const { id, data } = payload;
      return await pCategoryService.updateProductsCategory(id, data);
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
export const deleteProductsCategory = createAsyncThunk(
  "pCategory/delete-pCategory",
  async (id, thunkAPI) => {
    try {
      return await pCategoryService.deleteProductsCategory(id);
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
    RESET_PCATEGORY(state) {
      state.pCategory = [];
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
      })
      .addCase(getProductsCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.pCategory = [];
      }) // Get A Product Category
      .addCase(getProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.pCategory = action.payload;
      })
      .addCase(getProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.pCategory = [];
      }) // Create Product Category
      .addCase(createProductsCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProductsCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.pCategory = action.payload;
        toast.success("Product Category Added Successfully");
      })
      .addCase(createProductsCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.pCategory = [];
        toast.error("Something went wrong");
      }) // Update Product Category
      .addCase(updateProductsCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProductsCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.pCategory = action.payload;
        toast.success("Product Category Updated Successfully");
      })
      .addCase(updateProductsCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.pCategory = [];
        toast.error("Something went wrong");
      }) // Delete Product Category
      .addCase(deleteProductsCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProductsCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.pCategory = action.payload;
        toast.success("Product Category Deleted Successfully");
      })
      .addCase(deleteProductsCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.pCategory = [];
        toast.error("Something went wrong");
      });
  },
});

export const { RESET_PCATEGORY } = pCategorySlice.actions;
export default pCategorySlice.reducer;
