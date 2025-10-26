import apiSlice from "../../src/services/api";

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query({
      query: () => "dashboard/stats",
    }),
  }),
});

export const { useGetStatsQuery } = dashboardApi;
