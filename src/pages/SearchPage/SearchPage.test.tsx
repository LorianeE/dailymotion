import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "./SearchPage";

describe("SearchPage", () => {
  it("renders the homepage hero without a default trending section", () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", {
        name: /find something worth watching/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/search for anything/i),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /trending now/i }),
    ).not.toBeInTheDocument();
  });

  it("shows results after a suggestion is selected", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: "Space" }));

    expect(
      await screen.findByRole("heading", { name: /results for "space"/i }),
    ).toBeInTheDocument();
  });
});
