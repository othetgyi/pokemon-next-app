import axios from "axios";
import { postRequest } from "./axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("axios", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should make a post request", async () => {
    const mockResponse = { data: { mock: "value" } };

    mockedAxios.post.mockResolvedValue(mockResponse);
    const url = "/mock/path";
    const data = await postRequest(
      url,
      { email: "test@testemail.com" },
      { "Content-Type": "application/json" }
    );

    expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    expect(data).toEqual(mockResponse.data);
    expect(mockedAxios.post).toHaveBeenCalledWith(
      url,
      { email: "test@testemail.com" },
      { headers: { "Content-Type": "application/json" } }
    );
  });
});