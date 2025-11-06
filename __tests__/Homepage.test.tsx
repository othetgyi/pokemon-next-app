import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Homepage from "../src/app/components/Homepage";
import { postRequest } from "../src/app/api/axios";

jest.mock("../src/app/api/axios");
const mockedPostRequest = postRequest as jest.Mock;

describe("Home page", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  })

  const mockResponse1 = {
    data: {
      pokemons: {
        results: [
          {
            id: 1,
            name: "Pokemon1",
            dreamworld: "/pokemon1.png",
            types: [
              {
                type: {
                  name: "grass",
                },
                slot: 1,
              },
              {
                type: {
                  name: "electric",
                },
                slot: 2,
              },
            ],
          },
          {
            id: 2,
            name: "Pokemon2",
            dreamworld: "/pokemon2.png",
            types: [
              {
                type: {
                  name: "grass",
                },
                slot: 1,
              },
              {
                type: {
                  name: "electric",
                },
                slot: 2,
              },
            ],
          },
          {
            id: 3,
            name: "Pokemon3",
            dreamworld: "/pokemon3.png",
            types: [
              {
                type: {
                  name: "grass",
                },
                slot: 1,
              },
              {
                type: {
                  name: "electric",
                },
                slot: 2,
              },
            ],
          },
          {
            id: 4,
            name: "Pokemon4",
            dreamworld: "/pokemon4.png",
            types: [
              {
                type: {
                  name: "grass",
                },
                slot: 1,
              },
              {
                type: {
                  name: "electric",
                },
                slot: 2,
              },
            ],
          },
        ],
      },
    },
  };

  const mockResponse2 = {
    data: {
      pokemons: {
        results: [
          {
            id: 5,
            name: "Pokemon5",
            dreamworld: "/pokemon5.png",
            types: [
              {
                type: {
                  name: "grass",
                },
                slot: 1,
              },
              {
                type: {
                  name: "electric",
                },
                slot: 2,
              },
            ],
          },
          {
            id: 6,
            name: "Pokemon6",
            dreamworld: "/pokemon6.png",
            types: [
              {
                type: {
                  name: "grass",
                },
                slot: 1,
              },
              {
                type: {
                  name: "electric",
                },
                slot: 2,
              },
            ],
          },
          {
            id: 7,
            name: "Pokemon7",
            dreamworld: "/pokemon7.png",
            types: [
              {
                type: {
                  name: "grass",
                },
                slot: 1,
              },
              {
                type: {
                  name: "electric",
                },
                slot: 2,
              },
            ],
          },
          {
            id: 8,
            name: "Pokemon8",
            dreamworld: "/pokemon8.png",
            types: [
              {
                type: {
                  name: "grass",
                },
                slot: 1,
              },
              {
                type: {
                  name: "electric",
                },
                slot: 2,
              },
            ],
          },
        ],
      },
    },
  };

  it("calls the Pokemon API to get the names and images of 4 Pokemon", async () => {
    mockedPostRequest.mockResolvedValue(mockResponse1);

    render(<Homepage />);

    waitFor(() => {
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
    render(<Homepage />);

    const logo = screen.getByRole("img", { name: "Pokemon logo" });

    expect(logo).toBeInTheDocument();
  });

  it("calls the Pokemon API to get 4 additional Pokemon when the Load More Pokemon button is clicked", async () => {
    mockedPostRequest.mockResolvedValue(mockResponse1);

    const user = userEvent.setup();
    render(<Homepage />);

    await waitFor(() => {
      expect(screen.getAllByRole("heading").length).toBe(4);
    })

    mockedPostRequest.mockResolvedValue(mockResponse2);

    const button = screen.getByText("Load more Pokemon");
    await user.click(button);

    await waitFor(() => {
      expect(screen.getAllByRole("heading").length).toBe(8);
    })
  });
});
