import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import enquiryService from "./enquiryService";
import { toast } from "react-toastify";

const initialState = {
  enquiries: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getEnquiries = createAsyncThunk(
  "enquiry/get-enquiry",
  async (thunkAPI) => {
    try {
      return await enquiryService.getEnquiries();
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
export const getAEnquiry = createAsyncThunk(
  "enquiry/get-A-enquiry",
  async (id, thunkAPI) => {
    try {
      return await enquiryService.getAEnquiry(id);
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

export const upadteEnquiry = createAsyncThunk(
  "enquiry/update-enquiry",
  async (payload, thunkAPI) => {
    try {
      const { id, data } = payload;
      return await enquiryService.updateEnquiry(id, data);
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
export const deleteEnquiry = createAsyncThunk(
  "enquiry/delete-enquiry",
  async (id, thunkAPI) => {
    try {
      return await enquiryService.deleteEnquiry(id);
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

export const enquirySlice = createSlice({
  name: "enquiry",
  initialState,
  reducers: {
    RESET_ENQUIRY(state) {
      state.enquiries = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // Get All Enquiries
    builder
      .addCase(getEnquiries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEnquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquiries = action.payload;
      })
      .addCase(getEnquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.enquiries = [];
      }) // Get A Enquiry
      .addCase(getAEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquiries = action.payload;
      })
      .addCase(getAEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.enquiries = [];
      }) // Update A Enquiry
      .addCase(upadteEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(upadteEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquiries = action.payload;
        toast.success("Enquiry Update Succesfully");
      })
      .addCase(upadteEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.enquiries = [];
        toast.error("Something Went Wrong");
      }) // Delete A Enquiry
      .addCase(deleteEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquiries = action.payload;
        toast.success("Enquiry Deleted Successfully");
      })
      .addCase(deleteEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        state.enquiries = [];
        toast.error("Something went wrong");
      });
  },
});

export const { RESET_ENQUIRY } = enquirySlice.actions;
export default enquirySlice.reducer;
