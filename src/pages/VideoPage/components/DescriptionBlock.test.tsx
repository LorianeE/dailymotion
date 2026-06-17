import { render, screen } from "@testing-library/react";

import { DescriptionBlock } from "./DescriptionBlock";
import { formatVideoDescription } from "./descriptionFormat";

describe("formatVideoDescription", () => {
  it("turns HTML line breaks into text line breaks and removes tags", () => {
    expect(
      formatVideoDescription(
        "Parwarish Episode 12 <br /><br />Cast:<br />Samar Jafri<br /><strong>Aina Asif</strong>",
      ),
    ).toBe("Parwarish Episode 12\n\nCast:\nSamar Jafri\nAina Asif");
  });

  it("decodes HTML entities without rendering HTML tags", () => {
    expect(formatVideoDescription("Tom &amp; Jerry &lt;script&gt;")).toBe(
      "Tom & Jerry <script>",
    );
  });
});

describe("DescriptionBlock", () => {
  it("renders formatted descriptions as plain text", () => {
    render(
      <DescriptionBlock
        description="Line one<br />Line two <strong>bold</strong>"
        isLoading={false}
      />,
    );

    expect(screen.getByText(/Line one/).textContent).toBe(
      "Line one\nLine two bold",
    );
  });

  it("falls back when the description only contains tags", () => {
    render(<DescriptionBlock description="<br /><br />" isLoading={false} />);

    expect(screen.getByText("No description available.")).toBeInTheDocument();
  });
});
