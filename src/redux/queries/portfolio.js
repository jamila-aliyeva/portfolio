import createQuery from "../../sever/query";

export const portfolioQuery = createQuery({
  reducerPath: "portfolio",
  endpoints: (builder) => ({
    getPortfolios: builder.query({
      query: (params) => ({
        method: "GET",
        url: "portfolios",
        params,
      }),
      transformResponse: (res) => ({
        portfolios: res.data.map((el) => ({ ...el, key: el._id })),
        total: res.pagination.total,
      }),
    }),
    getPortfolio: builder.mutation({
      query: (id) => ({
        method: "GET",
        url: `portfolios/${id}`,
      }),
    }),
    createPortfolio: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: "portfolios",
        body,
      }),
    }),
    updatePortfolio: builder.mutation({
      query: ({ id, body }) => ({
        method: "PUT",
        url: `portfolios/${id}`,
        body,
      }),
    }),
    deletePortfolio: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `portfolios/${id}`,
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

const { reducer: portfolioReducer, reducerPath: portfolioName } =
  portfolioQuery;

export { portfolioQuery as default, portfolioName, portfolioReducer };

export const {
  useGetPortfoliosQuery,
  useUploadPhotoMutation,
  useCreatePortfolioMutation,
  useGetPortfolioMutation,
  useUpdatePortfolioMutation,
  useDeletePortfolioMutation,
} = portfolioQuery;
