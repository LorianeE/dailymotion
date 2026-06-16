import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "./SearchPage";

describe("SearchPage", () => {
  it("renders the milestone placeholder", () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: /browse dailymotion videos/i }),
    ).toBeInTheDocument();
  });
});
