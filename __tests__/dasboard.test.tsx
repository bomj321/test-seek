import "@testing-library/jest-dom";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import Dashboard from "../app/(admin)/dashboard/page";
import { renderWithProviders } from "@lib/utils-for-tests";

const originalConsoleError = console.error;
const jsDomCssError = "Error: Could not parse CSS stylesheet";
const reactError =
  "intercept-console-error.js:51 Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.";

console.error = (...params) => {
  if (
    !params.find(
      (p) =>
        p.toString().includes(jsDomCssError) ||
        p.toString().includes(reactError)
    )
  ) {
    originalConsoleError(...params);
  }
};

describe("Basic elements", () => {
  it("renders the image", async () => {
    renderWithProviders(<Dashboard />);
    await waitFor(() => {
      const button = screen.getByAltText("logo");
      expect(button).not.toBeNull();
    });
  });

  it("renders a button title", async () => {
    renderWithProviders(<Dashboard />);
    await waitFor(() => {
      const button = screen.getByText("Tarea");
      expect(button).not.toBeNull();
    });
  });

  it("renders the Table", async () => {
    renderWithProviders(<Dashboard />);
    await waitFor(() => {
      const button = screen.getByRole("table");
      expect(button).not.toBeNull();
    });
  });
});

describe("Click events", () => {
  it("Clicking button to open a modal", async () => {
    renderWithProviders(<Dashboard />);
    await waitFor(() => {
      const button = screen.getByText("Tarea");
      fireEvent.click(button);
      const modal = screen.getByRole("dialog");
      expect(modal).not.toBeNull();
    });
  });
});
