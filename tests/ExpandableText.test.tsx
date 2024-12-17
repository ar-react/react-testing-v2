import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ExpandableText from "../src/components/ExpandableText";

describe("ExpandableText", () => {
  const LIMIT = 255;
  const longText = "a".repeat(LIMIT + 1);
  const truncatedText = longText.substring(0, LIMIT) + "...";

  it("should render the full text if less than 255 characters", () => {
    const text = "Hello, World!";
    render(<ExpandableText text={text} />);

    const fullText = screen.getByText(text);
    expect(fullText).toBeInTheDocument();
  });

  it("should truncate text if longer than 255 characters", () => {
    render(<ExpandableText text={longText} />);

    expect(screen.getByText(truncatedText)).toBeInTheDocument();

    // now check for the 'show-more' button
    const button = screen.getByRole("button", { name: /show more/i });
    expect(button).toBeInTheDocument();
  });

  it("should expand text when 'Show More' button is clicked", async () => {
    render(<ExpandableText text={longText} />);

    const button = screen.getByRole("button", { name: /more/i });

    await userEvent.click(button);

    expect(screen.getByText(longText)).toBeInTheDocument();
    expect(button).toHaveTextContent(/less/i);
  });

  it("should collapsed when 'Show Less' button is clicked", async () => {
    render(<ExpandableText text={longText} />);
    const button = screen.getByRole("button", { name: /more/i });
    await userEvent.click(button); // expand
    await userEvent.click(button); // collapse

    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    expect(button).toHaveTextContent(/more/i);
  });
});
