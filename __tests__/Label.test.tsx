import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Label from "../src/app/components/Label";

describe("Label", () => {
  it("renders a label", () => {
    render(<Label type="fire" />);

    const text = screen.getByRole("heading");

    expect(text).toBeInTheDocument();
  });
});
