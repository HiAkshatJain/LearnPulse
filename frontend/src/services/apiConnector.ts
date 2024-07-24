import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

// Create an instance of Axios with default configuration
export const axiosInstance = axios.create({});

// Define types for the parameters used in apiConnector function
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface ApiConnectorParams {
  method: HttpMethod;
  url: string;
  bodyData?: any;
  headers?: any;
  params?: any;
}

export const apiConnector = ({
  method,
  url,
  bodyData,
  headers,
  params,
}: ApiConnectorParams): Promise<any> => {
  const axiosConfig: AxiosRequestConfig = {
    method: method,
    url: url,
    data: bodyData ?? null,
    headers: headers,
    params: params ?? null,
  };

  return axiosInstance(axiosConfig)
    .then((response: AxiosResponse<any>) => {
      return response;
    })
    .catch((error: AxiosError<any>) => {
      // Handle Axios errors here
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Request:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
      }
      console.error("Error config:", error.config);
      throw error; // Rethrow the error to propagate it further
    });
};
