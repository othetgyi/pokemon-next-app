import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../src/app/page";
import { postRequest } from "../src/app/api/axios";

jest.mock("../src/app/api/axios");
const mockedPostRequest = postRequest as jest.Mock;

describe("Home page", () => {
  it("calls the Pokemon API to get the names and images of 4 Pokemon", async () => {
    const mockResponse = {
      data: {
        pokemons: {
          results: [
            { id: 1, name: "Bulbasaur", dreamworld: "/bulbasaur.png" },
            { id: 2, name: "Ivysaur", dreamworld: "/ivysaur.png" },
            { id: 3, name: "Charmander", dreamworld: "/charmander.png" },
            { id: 4, name: "Squirtle", dreamworld: "/squirtle.png" },
          ],
        },
      },
    };
    mockedPostRequest.mockResolvedValue(mockResponse);

    render(<Home />);

    await waitFor(() => {
      const names = screen.getAllByRole("heading");
      const images = screen.getAllByRole("img");

      expect(names[0]).toBeInTheDocument();
      expect(images[0]).toBeInTheDocument();
      expect(names[1]).toBeInTheDocument();
      expect(images[1]).toBeInTheDocument();
      expect(names[2]).toBeInTheDocument();
      expect(images[2]).toBeInTheDocument();
      expect(names[3]).toBeInTheDocument();
      expect(images[3]).toBeInTheDocument();
    });
  });
  it("displays the Pokemon logo", () => {
    render(<Home />);

    const logo = screen.getByRole("img", { name: "Pokemon logo" });

    expect(logo).toBeInTheDocument();
  });
});
