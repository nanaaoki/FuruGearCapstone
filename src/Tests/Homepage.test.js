/**
 * @jest-environment jsdom
 */

// const { render, screen, fireEvent } = require("@testing-library/react");
// const Homepage = require("../components/Homepage");

import { render, screen, fireEvent } from "@testing-library/react";
import Homepage from "../components/Homepage";
import "@testing-library/jest-dom";

describe("Homepage component", () => {
  test("displays the title", () => {
    render(<Homepage />);
    const title = screen.getByRole("heading", {
      name: "Sustainability & Quality",
    });
    expect(title).toBeInTheDocument();
  });

  test("displays an image", () => {
    render(<Homepage />);
    const image = screen.getByAltText(
      "image of a woman holding a pile of clothes"
    );
    expect(image).toBeInTheDocument();
  });

  test("displays mission statement", () => {
    render(<Homepage />);
    const para = screen.getByText(/Mission/);
    expect(para).toBeInTheDocument();
  });
});
