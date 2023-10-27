import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { message } from "antd";
import { ENDPOINT, TOKEN } from "../constants";

const baseQueryToasts = () => {
  const baseQuery = fetchBaseQuery({
    baseUrl: `${ENDPOINT}api/v1/`,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${Cookies.get(TOKEN)}`);
      return headers;
    },
  });
  return async (args, api, extraOptions) => {
    const { error, data } = await baseQuery(args, api, extraOptions);
    if (error) {
      message.error(error.data?.message || error.status || "unknown error");
      return { error: { status: error.status, data: error.data } };
    }
    return { data };
  };
};

const createQuery = (data) =>
  createApi({
    ...data,
    baseQuery: baseQueryToasts(),
  });

export default createQuery;
