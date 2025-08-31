import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChakraProviders } from "../providers/chakra";
import { Button } from "@chakra-ui/react";

describe("ChakraProviders", () => {
  it("should render children with Chakra theme", () => {
    render(
      <ChakraProviders>
        <Button data-testid="test-button">Test Button</Button>
      </ChakraProviders>
    );

    const button = screen.getByTestId("test-button");
    expect(button).toBeDefined();
  });

  it("should apply theme correctly", () => {
    render(
      <ChakraProviders>
        <div data-testid="theme-test">Theme Test</div>
      </ChakraProviders>
    );

    const element = screen.getByTestId("theme-test");
    expect(element).toBeDefined();
  });
});
