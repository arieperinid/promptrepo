import { ChakraProviders } from "@promptrepo/ui";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import HomePage from "../app/page";

function renderWithProviders(component: React.ReactElement) {
  return render(<ChakraProviders>{component}</ChakraProviders>);
}

describe("HomePage", () => {
  it("should render welcome message", () => {
    renderWithProviders(<HomePage />);

    expect(screen.getByText("Olá! PromptRepo está funcionando 🚀")).toBeDefined();
  });

  it("should render placeholder message", () => {
    renderWithProviders(<HomePage />);

    expect(screen.getByText(/Shell Supabase-like será feito no P1.3/)).toBeDefined();
  });
});
