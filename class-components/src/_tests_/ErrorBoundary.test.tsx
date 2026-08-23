import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorBoundary from "../components/ErrorBoundary";
import ErrorButton from "../components/ErrorButton";

const ThrowError = () => {
  throw new Error("Test error");
};

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("ErrorBoundary", () => {
  it("renders children when no error", () => {
    render(
      <ErrorBoundary>
        <div>Normal content</div>
      </ErrorBoundary>
    );
    expect(screen.getByText("Normal content")).toBeInTheDocument();
  });

  it("renders fallback UI when error occurs", () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
    expect(screen.getByText("Test error")).toBeInTheDocument();
  });

  it("logs error to console when error occurs", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(consoleSpy).toHaveBeenCalled();
  });
});

describe("ErrorButton", () => {
  it("renders trigger error button", () => {
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );
    expect(screen.getByText("Trigger Error")).toBeInTheDocument();
  });

  it("shows fallback UI when error button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );
    await user.click(screen.getByText("Trigger Error"));
    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
  });
});