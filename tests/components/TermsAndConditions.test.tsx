import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TermsAndConditions from "../../src/components/TermsAndConditions";

describe("TermsAndConditions", () => {
  const renderComponent = () => {
    render(<TermsAndConditions />);
    return {
      heading: screen.getByRole("heading"),
      checkbox: screen.getByRole("checkbox"),
      button: screen.getByRole("button"),
    };
  };
  it("should render with correct text and initial state", () => {
    const { heading, checkbox, button } = renderComponent();
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Terms & Conditions");

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Submit");
    expect(button).toBeDisabled();
  });
  it("should enable the button when the checkbox is checked", async () => {
    const { checkbox, button } = renderComponent();
    // fireEvent is used to simulate user events
    // but it is a light wrapper around the browsers low level dispatchEvent API
    // Instead use user-event library for more realistic user events
    //fireEvent.click(screen.getByRole("checkbox"));
    const user = userEvent.setup();
    await user.click(checkbox);

    expect(button).toBeEnabled();
  });
});
