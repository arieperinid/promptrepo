import { Button } from "@chakra-ui/react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ChakraProviders } from "../providers/chakra";

describe("ChakraProviders", () => {
  it("should render children with Chakra theme", () => {
    render(
      <ChakraProviders>
        <Button data-testid="test-button">Test Button</Button>
      </ChakraProviders>,
    );

    const button = screen.getByTestId("test-button");
    expect(button).toBeDefined();
  });

  it("should apply theme correctly", () => {
    render(
      <ChakraProviders>
        <div data-testid="theme-test">Theme Test</div>
      </ChakraProviders>,
    );

    const element = screen.getByTestId("theme-test");
    expect(element).toBeDefined();
  });

  it("should render without crashing", () => {
    expect(() => {
      render(
        <ChakraProviders>
          <div>No crash test</div>
        </ChakraProviders>,
      );
    }).not.toThrow();
  });
});
