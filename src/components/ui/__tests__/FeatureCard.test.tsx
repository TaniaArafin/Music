import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FeatureCard } from "../FeatureCard";
import { Button } from "../Button";

describe("FeatureCard", () => {
  it("shows the title and content", () => {
    render(<FeatureCard title="Listen Together" content="Same song, same time." icon="users" />);
    expect(screen.getByRole("heading", { name: "Listen Together" })).toBeInTheDocument();
    expect(screen.getByText("Same song, same time.")).toBeInTheDocument();
  });
});

describe("Button", () => {
  it("renders a button that can be disabled", () => {
    render(<Button disabled>Save</Button>);
    expect(screen.getByRole("button", { name: "Save" })).toBeDisabled();
  });
});
