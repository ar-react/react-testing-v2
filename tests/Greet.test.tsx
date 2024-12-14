import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import Greet from "../src/components/Greet";

describe("Greet", () => {
  it("should render Hello with the name when name is provided", () => {
    render(<Greet name="Arup" />);

    const heading = screen.getByRole("heading");

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Hello Arup/i);
  });

  it("should render Login Button when name is not provided", () => {
    render(<Greet />);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/login/i);
  });
});
