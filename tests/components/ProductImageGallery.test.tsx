import { render, screen } from "@testing-library/react";
import ProductImageGallery from "../../src/components/ProductImageGallery";

describe("ProductImageGallery", () => {
  it("should render no list when the imageUrls array is empty", () => {
    const { container } = render(<ProductImageGallery imageUrls={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
  it("should render a list when the imageUrls array is provided", () => {
    const animalImageUrls: string[] = [
      "https://unsplash.com/photos/Tjbk79TARiE",
      "https://unsplash.com/photos/U5rMrSI7Pn4",
    ];
    render(<ProductImageGallery imageUrls={animalImageUrls} />);

    const ul = screen.getByRole("list");
    const li = screen.getAllByRole("listitem");
    const img = screen.getAllByRole("img");

    expect(ul).toBeInTheDocument();
    expect(li).toHaveLength(animalImageUrls.length);
    expect(img).toHaveLength(animalImageUrls.length);

    li.forEach((item, index) => {
      expect(item).toHaveTextContent("");
      expect(item).toContainElement(img[index]);
    });
    animalImageUrls.forEach((url, index) => {
      const image = img[index];
      expect(image).toHaveAttribute("src", url);
    });
  });
});
