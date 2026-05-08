import { GET_PRODUCTS } from "~/config/api-config";
import { apiCall } from "~/config/http-config";

export const getAllProducts = () => {
  return apiCall({
    method: "GET",
    url: GET_PRODUCTS(),
  });
};
