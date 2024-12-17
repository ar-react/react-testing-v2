import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TermsAndConditions from "../src/components/TermsAndConditions";

describe("TermsAndConditions", () => {
  it("should render with correct text and initial state", () => {
    render(<TermsAndConditions />);

    // should render the heading
    const heading = screen.getByRole("heading", {
      name: /terms & conditions/i,
    });
    expect(heading).toBeInTheDocument();

    // checkbox to be unchecked initially.
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();

    // button should be disabled initial until checkbox is checked.
    const button = screen.getByRole("button", { name: /submit/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it("should enable the button when checkbox is checked", async () => {
    render(<TermsAndConditions />);

    const checkbox = screen.getByRole("checkbox");
    const user = userEvent.setup();

    await user.click(checkbox);

    expect(screen.getByRole("button")).toBeEnabled();
  });
});
