import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Flyout from "../components/Flyout";
import useSelectedStore from "../store/selectedStore";

const mockPokemon = {
  name: "bulbasaur",
  id: 1,
  description: "Type: grass",
  sprites: { front_default: "https://example.com/bulbasaur.png" },
};

beforeEach(() => {
  useSelectedStore.setState({ selectedItems: [] });
});

describe("Flyout", () => {
  it("renders nothing when no items selected", () => {
    const { container } = render(<Flyout />);
    expect(container.firstChild).toBeNull();
  });

  it("renders when items are selected", () => {
    useSelectedStore.setState({ selectedItems: [mockPokemon] });
    render(<Flyout />);
    expect(screen.getByText("1 item(s) selected")).toBeInTheDocument();
  });

  it("shows correct count of selected items", () => {
    useSelectedStore.setState({
      selectedItems: [mockPokemon, { ...mockPokemon, id: 2, name: "charmander" }],
    });
    render(<Flyout />);
    expect(screen.getByText("2 item(s) selected")).toBeInTheDocument();
  });

  it("renders unselect all and download buttons", () => {
    useSelectedStore.setState({ selectedItems: [mockPokemon] });
    render(<Flyout />);
    expect(screen.getByText("Unselect all")).toBeInTheDocument();
    expect(screen.getByText("Download")).toBeInTheDocument();
  });

  it("unselects all items when button clicked", async () => {
    const user = userEvent.setup();
    useSelectedStore.setState({ selectedItems: [mockPokemon] });
    render(<Flyout />);
    await user.click(screen.getByText("Unselect all"));
    expect(useSelectedStore.getState().selectedItems).toHaveLength(0);
  });

  it("downloads csv when download button clicked", async () => {
    const user = userEvent.setup();
    URL.createObjectURL = vi.fn(() => "blob:url");
    URL.revokeObjectURL = vi.fn();

    useSelectedStore.setState({ selectedItems: [mockPokemon] });
    render(<Flyout />);

    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});
    await user.click(screen.getByText("Download"));
    expect(URL.createObjectURL).toHaveBeenCalled();
    expect(clickSpy).toHaveBeenCalled();
  });
});