import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Card from "../src/app/components/Card";

describe("Card", () => {
  it("renders a card", () => {
    const bulbasaurImage = "/bulbasaur.png";
    render(<Card pokemonName="Bulbasaur" image={bulbasaurImage} />);

    const name = screen.getByRole("heading");
    const image = screen.getByRole("img");

    expect(name).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });
});
