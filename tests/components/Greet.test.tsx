import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import Greet from "../../src/components/Greet";
describe("Greet", () => {
  it("should render a Hello with the name when name is provided", () => {
    // Renders our component into a virtual DOM using JSDOM
    render(<Greet name="Shaon" />);
    const heading = screen.getByRole("heading");
    // Assertion
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Hello Shaon/i);
  });
  it('should render a "Login" button when name is not provided', () => {
    render(<Greet />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/Login/i);
  });
});
