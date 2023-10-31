import Cookies from "js-cookie";
import createQuery from "../../sever/query";

export const userQuery = createQuery({
  reducerPath: "users",
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params) => ({
        method: "GET",
        url: "users",
        params,
      }),
      transformResponse: (res) => ({
        Users: res.data.map((el) => ({ ...el, key: el._id })),
        total: res.pagination.total,
      }),
    }),
    getUser: builder.mutation({
      query: (id) => ({
        method: "GET",
        url: `users/${id}`,
      }),
    }),

    getNonClientUsers: builder.query({
      query: (params) => ({
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        method: "GET",
        url: "users",
        params,
      }),
      transformResponse: (res) => ({
        users: res.data.map((el) => ({ ...el, key: el._id })),
        total: res.pagination.total,
      }),
    }),

    createUser: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: "users",
        body,
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, body }) => ({
        method: "PUT",
        url: `users/${id}`,
        body,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `users/${id}`,
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

const { reducer: userReducer, reducerPath: userName } = userQuery;

export { userQuery as default, userName, userReducer };

export const {
  useGetUsersQuery,
  useGetNonClientUsersQuery,
  useUploadPhotoMutation,
  useCreateUserMutation,
  useGetUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userQuery;
