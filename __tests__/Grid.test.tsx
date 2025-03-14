import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Grid from "../src/app/components/Grid";

describe("Grid", () => {
  it("renders a grid of cards", () => {
    const pokemonData = [
      { id: 1, name: "Bulbasaur", image: "/bulbasaur.png" },
      { id: 2, name: "Ivysaur", image: "/ivysaur.png" },
      { id: 3, name: "Charmander", image: "/charmander.png" },
      { id: 4, name: "Squirtle", image: "/squirtle.png" },
    ];

    render(<Grid pokemonDataArray={pokemonData} />);

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
