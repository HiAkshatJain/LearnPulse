import { apiConnector } from "../apiConnector";
import { catalogData } from "../apis";

export const getCatalogPageData = async (categoryId: string) => {
  let result = [];

  try {
    const response = await apiConnector({
      method: "POST",
      url: catalogData.CATALOGPAGEDATA_API,
      bodyData: categoryId,
    });
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Course Categories");
    }
    result = response?.data?.data;
  } catch (error) {}
  return result;
};
