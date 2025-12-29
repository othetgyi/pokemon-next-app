import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "../src/app/components/Card";

describe("Card", () => {
  it("renders a card", () => {
    const bulbasaurImage = "/bulbasaur.png";
    const types = [
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
    ];

    render(
      <Card pokemonName="Bulbasaur" image={bulbasaurImage} types={types} />
    );

    const name = screen.getByRole("heading", { level: 3 });
    const type = screen.getAllByRole("heading", { level: 4 });
    const image = screen.getByRole("img");

    expect(name).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(type[0]).toBeInTheDocument();
    expect(type[1]).toBeInTheDocument();
  });
});