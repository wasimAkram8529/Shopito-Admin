import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bCategoryService from "./bCategoryService";
import { toast } from "react-toastify";

const initialState = {
  bCategory: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getBlogCategory = createAsyncThunk(
  "bCategory/get-blogCategory",
  async (thunkAPI) => {
    try {
      return await bCategoryService.getBlogCategory();
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
export const getABlogCategory = createAsyncThunk(
  "bCategory/get-A-blogCategory",
  async (id, thunkAPI) => {
    try {
      return await bCategoryService.getABlogCategory(id);
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
export const updateBlogCategory = createAsyncThunk(
  "bCategory/update-blogCategory",
  async (payload, thunkAPI) => {
    try {
      const { id, data } = payload;
      return await bCategoryService.updateBlogCategory(id, data);
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
export const deleteBlogCategory = createAsyncThunk(
  "bCategory/delete-blogCategory",
  async (id, thunkAPI) => {
    try {
      return await bCategoryService.deleteBlogCategory(id);
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
export const createBlogCategory = createAsyncThunk(
  "bCategory/create-blogs",
  async (data, thunkAPI) => {
    try {
      return await bCategoryService.createBlogCategory(data);
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

export const bCategorySlice = createSlice({
  name: "blogCategory",
  initialState,
  reducers: {
    RESET_BLOG_CATEGORY(state) {
      state.bCategory = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // Get Blog Category
    builder
      .addCase(getBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.bCategory = action.payload;
      })
      .addCase(getBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.bCategory = [];
      }) // Create Blog Category
      .addCase(createBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.bCategory = action.payload;
        toast.success("Blog Category Added Successfully");
      })
      .addCase(createBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.bCategory = [];
        toast.error("Something went wrong");
      }) // Get A Blog Category
      .addCase(getABlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getABlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.bCategory = action.payload;
      })
      .addCase(getABlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.bCategory = [];
      }) // Update Blog Category
      .addCase(updateBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.bCategory = action.payload;
        toast.success("Blog Category Updated Successfully");
      })
      .addCase(updateBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.bCategory = [];
        toast.error("Something went wrong");
      }) // Delete Blog Category
      .addCase(deleteBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.bCategory = action.payload;
        toast.success("Blog Category Deleted Successfully");
      })
      .addCase(deleteBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.bCategory = [];
        toast.error("Something went wrong");
      });
  },
});

export const { RESET_BLOG_CATEGORY } = bCategorySlice.actions;
export default bCategorySlice.reducer;
