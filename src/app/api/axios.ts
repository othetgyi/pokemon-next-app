import axios from "axios";

export const postRequest = async (
  url: string,
  data: object,
  headers: object
) => {
  try {
    const response = await axios.post(url, data, { headers });
    return response.data;
  } catch (error) {
    throw error;
  }
};
