import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom";

describe("App component", () => {
    test("displays the title", () => {
render (<App />);
const title = screen.getByRole("heading")
    })
})