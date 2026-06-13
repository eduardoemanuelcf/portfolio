import React from "react";
import { describe, it, expect } from "vitest";
import { renderWithIntl, screen } from "../helpers/renderWithIntl";
import { Contact } from "@/components/sections/Contact";

describe("Contact", () => {
  it("renders the request form, fields and channels", () => {
    renderWithIntl(<Contact />);

    expect(screen.getByText("Send a message")).toBeInTheDocument();

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Send message" })).toBeInTheDocument();
  });
});
