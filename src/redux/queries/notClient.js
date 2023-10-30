import createQuery from "../../sever/query";

export const notClientQuery = createQuery({
  reducerPath: "users",
  endpoints: (builder) => ({
    getNotClient: builder.query({
      query: (params) => ({
        method: "GET",
        url: "users?role=user",
        params,
      }),
      transformResponse: (res) => ({
        Users: res.data.map((el) => ({ ...el, key: el._id })),
        total: res.pagination.total,
      }),
    }),
    uploadPhoto: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: "upload",
        body,
      }),
    }),
  }),
});

const { reducer: notClientReducer, reducerPath: notClientName } =
  notClientQuery;

export { notClientQuery as default, notClientName, notClientReducer };

export const { useGetNotClientQuery, useUploadPhotoMutation } = notClientQuery;
