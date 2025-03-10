import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Card from "../src/app/components/Card";

describe("Card", () => {
  it("renders a card", () => {
    render(<Card pokemonName="Bulbasaur" />);

    const name = screen.getByRole("heading");

    expect(name).toBeInTheDocument();
  });
});
