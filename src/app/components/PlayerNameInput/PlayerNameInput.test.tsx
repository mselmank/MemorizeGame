"use client";

import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it } from "node:test";
import { expect } from "@jest/globals";
import { PlayerNameInput } from "./PlayerNameInput";

describe("PlayerNameInput", () => {
  it("allows the user to enter a name and submit the form", async () => {
    // Arrange
    const username = "John Doe";
    render(<PlayerNameInput />);

    const inputElement = screen.getByPlaceholderText("");
    const submitButton = screen.getByText("Comenzar");

    // Act
    await userEvent.type(inputElement, username);
    fireEvent.click(submitButton);
    // Assert
    expect(localStorage.getItem("name")).toBe(username);
  });
});
