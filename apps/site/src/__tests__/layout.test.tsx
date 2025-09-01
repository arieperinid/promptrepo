import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import RootLayout from "../app/layout";

// Mock next/font to avoid issues in tests
vi.mock("next/font/google", () => ({
  Inter: () => ({
    className: "inter",
  }),
}));

describe("RootLayout", () => {
  it("should include ChakraProviders in layout", () => {
    const layoutContent = RootLayout.toString();
    expect(layoutContent).toContain("ChakraProviders");
  });

  it("should render without crashing", () => {
    expect(() => {
      render(
        <RootLayout>
          <div>Test content</div>
        </RootLayout>,
      );
    }).not.toThrow();
  });
});
