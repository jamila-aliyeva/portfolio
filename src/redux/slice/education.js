import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "../../sever";
import { LIMIT } from "../../constants";

const initialState = {
  education: [],
  loading: false,
  total: 0,
  isModalLoading: false,
};

export const getEducations = createAsyncThunk(
  "education/fetching",
  async ({ search, page }) => {
    const params = { search, page, limit: LIMIT };
    const { data } = await request.get("education", { params });
    return data;
  }
);

export const addEducation = createAsyncThunk(
  "education/add",
  async (values) => {
    await request.post("education", values);
  }
);

export const deleteEducation = createAsyncThunk(
  "education/delete",
  async (id) => {
    await request.delete(`education/${id}`);
  }
);

export const getEducation = createAsyncThunk("education/get", async (id) => {
  const { data } = await request.get(`education/${id}`);
  return data;
});

export const updateEducation = createAsyncThunk(
  "education/update",
  async ({ id, values }) => {
    await request.put(`education/${id}`, values);
  }
);

const EducationSlice = createSlice({
  initialState,
  name: "education",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEducations.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getEducations.fulfilled,
        (state, { payload: { data, pagination } }) => {
          state.education = data;
          state.total = pagination.total;
          state.loading = false;
        }
      )
      .addCase(getEducations.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addEducation.pending, (state) => {
        state.isModalLoading = true;
      })
      .addCase(addEducation.fulfilled, (state) => {
        state.isModalLoading = false;
      })
      .addCase(addEducation.rejected, (state) => {
        state.isModalLoading = false;
      }).addCase;
  },
});

const { name, reducer: educationReducer } = EducationSlice;

export { name as educationName, educationReducer as default };
