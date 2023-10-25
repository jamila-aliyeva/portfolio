import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "../../sever";
import { LIMIT } from "../../constants";

const initialState = {
  skills: [],
  loading: false,
  total: 0,
  isModalLoading: false,
};

export const getSkills = createAsyncThunk(
  "skill/fetching",
  async ({ search, page }) => {
    const params = { search, page, limit: LIMIT };
    const { data } = await request.get("skills", { params });
    return data;
  }
);

export const addSkill = createAsyncThunk("skill/add", async (values) => {
  await request.post("skills", values);
});

export const deleteSkill = createAsyncThunk("skill/delete", async (id) => {
  await request.delete(`skills/${id}`);
});

export const getSkill = createAsyncThunk("skill/get", async (id) => {
  const { data } = await request.get(`skills/${id}`);
  return data;
});

export const updateSkill = createAsyncThunk(
  "skill/update",
  async ({ id, values }) => {
    await request.put(`skills/${id}`, values);
  }
);

const skillSlice = createSlice({
  initialState,
  name: "skill",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSkills.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getSkills.fulfilled,
        (state, { payload: { data, pagination } }) => {
          state.skills = data;
          state.total = pagination.total;
          state.loading = false;
        }
      )
      .addCase(getSkills.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addSkill.pending, (state) => {
        state.isModalLoading = true;
      })
      .addCase(addSkill.fulfilled, (state) => {
        state.isModalLoading = false;
      })
      .addCase(addSkill.rejected, (state) => {
        state.isModalLoading = false;
      }).addCase;
  },
});

const { name, reducer: skillReducer } = skillSlice;

export { name as skillName, skillReducer as default };
