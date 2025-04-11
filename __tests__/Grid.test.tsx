import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Grid from "../src/app/components/Grid";

describe("Grid", () => {
  it("renders a grid of cards", () => {
    const pokemonData = [
      {
        id: 1,
        name: "Bulbasaur",
        dreamworld: "/bulbasaur.png",
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
        name: "Ivysaur",
        dreamworld: "/ivysaur.png",
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
        name: "Charmander",
        dreamworld: "/charmander.png",
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
        name: "Squirtle",
        dreamworld: "/squirtle.png",
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
    ];

    render(<Grid pokemonData={pokemonData} />);

    const name = screen.getAllByRole("heading");
    const image = screen.getAllByRole("img");

    expect(name[0]).toBeInTheDocument();
    expect(image[0]).toBeInTheDocument();
    expect(name[1]).toBeInTheDocument();
    expect(image[1]).toBeInTheDocument();
    expect(name[2]).toBeInTheDocument();
    expect(image[2]).toBeInTheDocument();
    expect(name[3]).toBeInTheDocument();
    expect(image[3]).toBeInTheDocument();
  });
});
