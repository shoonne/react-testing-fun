import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import ExpandableText from "../../src/components/ExpandableText";

describe("ExpandableText", () => {
  const limit = 255;
  const longText =
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse facilis consequuntur recusandae excepturi minus, delectus expedita dolor non voluptates placeat quae labore dolorum totam eligendi repudiandae adipisci reiciendis. Natus tempora dolorum nisi officiis quae, possimus vero, libero totam sint quidem officia soluta veritatis sit. Deserunt natus, ducimus temporibus exercitationem minus quo dicta aperiam impedit consequuntur adipisci non laudantium cum? Cupiditate dolorem quibusdam, ad minus alias obcaecati nisi quaerat architecto quasi in aliquid reprehenderit delectus nulla non maiores, magni sed natus animi quidem. Quas, atque tenetur? Odit corrupti optio ipsam repellat dolorum rem laborum excepturi, modi rerum cumque nam, distinctio mollitia.";
  const truncatedText = longText.substring(0, limit) + "...";
  it("should render with correct text and initial state", () => {
    render(<ExpandableText text="Lorem ipsum dolor sit amet" />);
    const article = screen.getByRole("article");
    const button = screen.queryByRole("button");

    expect(article).toBeInTheDocument();
    expect(article).toHaveTextContent("Lorem ipsum dolor sit amet");
    expect(button).not.toBeInTheDocument();
  });
  it("should render button with correct initial state when text is longer than the limit 255", () => {
    render(<ExpandableText text={longText} />);
    const article = screen.getByRole("article");
    const button = screen.getByRole("button");
    const articleText = article.textContent;

    expect(article).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(articleText).toBe(truncatedText);
    expect(button).toHaveTextContent("Show More");
  });
  it("should expand text when Show More is pressed", async () => {
    render(<ExpandableText text={longText} />);
    const button = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(button);
    expect(screen.queryByText(longText)).toBeInTheDocument();
    expect(button).toHaveTextContent("Show Less");
  });
  it("should collapse text when Show Less is pressed", async () => {
    render(<ExpandableText text={longText} />);
    const button = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(button);
    await user.click(button);

    expect(screen.queryByText(truncatedText)).toBeInTheDocument();
    expect(button).toHaveTextContent("Show More");
  });
});
