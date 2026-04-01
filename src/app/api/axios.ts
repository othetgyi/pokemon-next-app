import axios from "axios";

export const postRequest = async (
    url: string,
    data: object,
    headers: object
) => {
    const response = await axios.post(url, data, {headers});
    return response.data;
};

export const getRequest = async (url: string) => {
    const response = await axios.get(url)
    return response.data;
};