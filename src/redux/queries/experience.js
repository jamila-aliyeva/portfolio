import createQuery from "../../sever/query";

export const experienceQuery = createQuery({
  reducerPath: "experience",
  endpoints: (builder) => ({
    getExperiences: builder.query({
      query: (params) => ({
        method: "GET",
        url: "experiences",
        params,
      }),
      transformResponse: (res) => ({
        experiences: res.data.map((el) => ({ ...el, key: el._id })),
        total: res.pagination.total,
      }),
    }),
    getExperience: builder.mutation({
      query: (id) => ({
        method: "GET",
        url: `experiences/${id}`,
      }),
    }),
    createExperience: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: "experiences",
        body,
      }),
    }),
    updateExperience: builder.mutation({
      query: ({ id, body }) => ({
        method: "PUT",
        url: `experiences/${id}`,
        body,
      }),
    }),
    deleteExperience: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `experiences/${id}`,
      }),
    }),
  }),
});

const { reducer: experienceReducer, reducerPath: experienceName } =
  experienceQuery;

export { experienceQuery as default, experienceName, experienceReducer };

export const {
  useGetExperiencesQuery,
  useCreateExperienceMutation,
  useGetExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
} = experienceQuery;
