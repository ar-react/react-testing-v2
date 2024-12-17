import { render, screen } from "@testing-library/react";

import ProductImageGallery from "../src/components/ProductImageGallery";

describe("ProductImageGallery", () => {
  it("should render nothing if given an empty array", () => {
    const { container } = render(<ProductImageGallery imageUrls={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("should render list of images", () => {
    const imageUrls: string[] = ["image1.jpg", "image2.jpg", "image3.jpg"];
    render(<ProductImageGallery imageUrls={imageUrls} />);

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(imageUrls.length);
    images.forEach((image, index) => {
      expect(image).toHaveAttribute("src", imageUrls[index]);
    });
  });
});
