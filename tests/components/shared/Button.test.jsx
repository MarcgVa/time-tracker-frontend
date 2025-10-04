import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";


import Button from "../../../src/components/shared/Button";


describe('Button', () => {
  it('Should render a button configured based type submit', () => {
    render(<Button type="submit" title={"submit"} />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(/submit/i);
    expect(button).toHaveProperty('type', 'submit');
  });

  it("Should render a button configured based type button with text of 'more'", () => {
    render(<Button title={"More"} />);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent(/more/i);
    expect(button).toHaveProperty("type", "button");
  });
  it("Should render a button type button with text of 'Loading...'", () => {
    render(<Button title={"More"} isLoading={true} />);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent(/Loading.../i);
    expect(button).toHaveProperty("type", "button");
  });
})