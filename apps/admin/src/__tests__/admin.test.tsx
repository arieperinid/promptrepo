import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChakraProviders } from "@promptrepo/ui";
import AdminPage from "../app/page";

function renderWithProviders(component: React.ReactElement) {
  return render(<ChakraProviders>{component}</ChakraProviders>);
}

describe("AdminPage", () => {
  it("should render admin heading", () => {
    renderWithProviders(<AdminPage />);
    
    expect(screen.getByText("Painel Administrativo")).toBeDefined();
  });

  it("should render admin badge", () => {
    renderWithProviders(<AdminPage />);
    
    expect(screen.getByText("ADMINISTRADOR")).toBeDefined();
  });

  it("should render placeholder message", () => {
    renderWithProviders(<AdminPage />);
    
    expect(screen.getByText(/Admin placeholder – UI no P4.1/)).toBeDefined();
  });
});
