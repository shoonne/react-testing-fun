import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import UserAccount from "../../src/components/UserAccount";

describe("UserAccount", () => {
  it("should render a edit button and the name when user is provided and is admin", () => {
    render(<UserAccount user={{ name: "Shaon", isAdmin: true, id: 1 }} />);
    const header = screen.getByRole("heading");
    const button = screen.getByRole("button");
    // div does not have a role, so we can use getByText
    // you can assign a role to a div if you want to use getByRole
    const nameLabel = screen.getByText(/Name:/i);
    const name = screen.getByText(/Shaon/i);

    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(/User Profile/i);
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/Edit/i);
    expect(nameLabel).toBeInTheDocument();
    expect(name).toBeInTheDocument();
  });
  it("should not render a edit button and the name when user is provided and is not admin", () => {
    render(<UserAccount user={{ name: "Shaon", isAdmin: false, id: 1 }} />);
    const header = screen.getByRole("heading");
    // getByRole will throw an error if the element is not found
    // queryByRole will return null if the element is not found
    const button = screen.queryByRole("button");
    const nameLabel = screen.getByText(/Name:/i);
    const name = screen.getByText(/Shaon/i);

    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(/User Profile/i);
    expect(button).toBeNull();
    expect(button).not.toBeInTheDocument();
    expect(nameLabel).toBeInTheDocument();
    expect(name).toBeInTheDocument();
  });
});
