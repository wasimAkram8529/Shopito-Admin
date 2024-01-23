import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import uploadService from "./uploadService";

const initialState = {
  images: [],
  isError: false,
  isLoadingImg: false,
  isSuccess: false,
  message: "",
};

export const uploadProductImg = createAsyncThunk(
  "uploadImg/upload-productImg",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append("images", data[i]);
      }
      return await uploadService.uploadProductImg(formData);
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
export const deleteProductImg = createAsyncThunk(
  "deleteImg/delete-productImg",
  async (id, thunkAPI) => {
    try {
      return await uploadService.deleteProductImg(id);
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

export const uploadSlice = createSlice({
  name: "uploadImg",
  initialState,
  reducers: {
    RESET_AUTH(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoadingImg = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // upload Product img
    builder
      .addCase(uploadProductImg.pending, (state) => {
        state.isLoadingImg = true;
      })
      .addCase(uploadProductImg.fulfilled, (state, action) => {
        state.isLoadingImg = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = action.payload;
        //console.log(state.customers);
      })
      .addCase(uploadProductImg.rejected, (state, action) => {
        state.isLoadingImg = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.images = null;
      }) // Delete Product Image
      .addCase(deleteProductImg.pending, (state) => {
        state.isLoadingImg = true;
      })
      .addCase(deleteProductImg.fulfilled, (state) => {
        state.isLoadingImg = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = [];
        //console.log(state.customers);
      })
      .addCase(deleteProductImg.rejected, (state, action) => {
        state.isLoadingImg = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.images = null;
      });
  },
});

export const { RESET_AUTH } = uploadSlice.actions;
export default uploadSlice.reducer;
