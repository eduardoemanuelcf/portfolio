import React from "react";
import { describe, it, expect } from "vitest";
import { renderWithIntl, screen } from "../helpers/renderWithIntl";
import { Hero } from "@/components/sections/Hero";

describe("Hero", () => {
  it("renders the thesis and action buttons", () => {
    renderWithIntl(<Hero />);

    expect(screen.getByText("I care how it's built, not just that it works.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Review projects" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Request a call" })).toBeInTheDocument();
  });

  it("renders the verification runner with passing suites", () => {
    renderWithIntl(<Hero />);

    expect(screen.getByText("Suites: 3 passed, 3 total")).toBeInTheDocument();
    expect(screen.getAllByText("PASS").length).toBe(3);
  });
});
