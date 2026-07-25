import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pagination from "../components/Pagination";

describe("Pagination", () => {
  it("renders previous and next buttons", () => {
    render(<Pagination currentPage={1} onPageChange={vi.fn()} hasNextPage={true} />);
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("shows current page number", () => {
    render(<Pagination currentPage={3} onPageChange={vi.fn()} hasNextPage={true} />);
    expect(screen.getByText("Page 3")).toBeInTheDocument();
  });

  it("disables previous button on first page", () => {
    render(<Pagination currentPage={1} onPageChange={vi.fn()} hasNextPage={true} />);
    expect(screen.getByText("Previous")).toBeDisabled();
  });

  it("disables next button when no next page", () => {
    render(<Pagination currentPage={1} onPageChange={vi.fn()} hasNextPage={false} />);
    expect(screen.getByText("Next")).toBeDisabled();
  });

  it("calls onPageChange with next page when next is clicked", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination currentPage={2} onPageChange={onPageChange} hasNextPage={true} />);
    await user.click(screen.getByText("Next"));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("calls onPageChange with previous page when previous is clicked", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(<Pagination currentPage={3} onPageChange={onPageChange} hasNextPage={true} />);
    await user.click(screen.getByText("Previous"));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});