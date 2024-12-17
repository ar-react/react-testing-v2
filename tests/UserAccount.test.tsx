import { render, screen } from "@testing-library/react";
import { User } from "../src/entities";
import UserAccount from "../src/components/UserAccount";

describe("UserAccount", () => {
  it("should render user name", () => {
    const user: User = { id: 1, name: "Arup" };

    render(<UserAccount user={user} />);

    expect(screen.getByText(/Arup/i)).toBeInTheDocument();
  });

  it("should render edit button if the user is admin", () => {
    const user: User = { id: 1, name: "Arup", isAdmin: true };

    render(<UserAccount user={user} />);

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/edit/i);
  });

  it("should not render edit button if the user is not admin", () => {
    const user: User = { id: 1, name: "Arup", isAdmin: false };

    render(<UserAccount user={user} />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
