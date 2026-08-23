import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "../components/Search";

const mockOnSearch = vi.fn();

beforeEach(() => {
  mockOnSearch.mockClear();
  localStorage.clear();
});

describe("Search", () => {
  it("renders search input and button", () => {
    render(<Search onSearch={mockOnSearch} initialValue="" />);
    expect(screen.getByPlaceholderText("Search Pokemon...")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  it("displays initial value in input", () => {
    render(<Search onSearch={mockOnSearch} initialValue="pikachu" />);
    const input = screen.getByPlaceholderText("Search Pokemon...") as HTMLInputElement;
    expect(input.value).toBe("pikachu");
  });

  it("shows empty input when no initial value", () => {
    render(<Search onSearch={mockOnSearch} initialValue="" />);
    const input = screen.getByPlaceholderText("Search Pokemon...") as HTMLInputElement;
    expect(input.value).toBe("");
  });

  it("updates input value when user types", async () => {
    const user = userEvent.setup();
    render(<Search onSearch={mockOnSearch} initialValue="" />);
    const input = screen.getByPlaceholderText("Search Pokemon...");
    await user.type(input, "pikachu");
    expect((input as HTMLInputElement).value).toBe("pikachu");
  });

  it("calls onSearch with trimmed value when button clicked", async () => {
    const user = userEvent.setup();
    render(<Search onSearch={mockOnSearch} initialValue="" />);
    const input = screen.getByPlaceholderText("Search Pokemon...");
    await user.type(input, "  pikachu  ");
    await user.click(screen.getByText("Search"));
    expect(mockOnSearch).toHaveBeenCalledWith("pikachu");
  });

  it("trims whitespace before calling onSearch", async () => {
    const user = userEvent.setup();
    render(<Search onSearch={mockOnSearch} initialValue="" />);
    const input = screen.getByPlaceholderText("Search Pokemon...");
    await user.type(input, "   ");
    await user.click(screen.getByText("Search"));
    expect(mockOnSearch).toHaveBeenCalledWith("");
  });
});