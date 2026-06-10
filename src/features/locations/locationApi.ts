import { API_ROUTES } from "@/config/apiRoutes";
import { baseApi } from "@/features/api/baseApi";
import type { ApiResponse } from "@/types";

export type PathaoCity = {
  city_id: number;
  city_name: string;
};

export type PathaoZone = {
  zone_id: number;
  zone_name: string;
};

export type PathaoArea = {
  area_id: number;
  area_name: string;
  home_delivery_available?: boolean;
  pickup_available?: boolean;
};

type PathaoLocationResponse<T> = ApiResponse<{
  items: T[];
  provider: "pathao";
}>;

export const locationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPathaoCities: builder.query<PathaoCity[], void>({
      query: () => API_ROUTES.ECOMMERCE_LOCATIONS.CITIES,
      transformResponse: (response: PathaoLocationResponse<PathaoCity>) => response.data.items,
    }),

    getPathaoZones: builder.query<PathaoZone[], string>({
      query: (cityId) => API_ROUTES.ECOMMERCE_LOCATIONS.ZONES(cityId),
      transformResponse: (response: PathaoLocationResponse<PathaoZone>) => response.data.items,
    }),

    getPathaoAreas: builder.query<PathaoArea[], string>({
      query: (zoneId) => API_ROUTES.ECOMMERCE_LOCATIONS.AREAS(zoneId),
      transformResponse: (response: PathaoLocationResponse<PathaoArea>) => response.data.items,
    }),
  }),
});

export const {
  useGetPathaoAreasQuery,
  useGetPathaoCitiesQuery,
  useGetPathaoZonesQuery,
} = locationApi;
