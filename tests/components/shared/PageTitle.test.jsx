import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import PageTitle from "../../../src/components/shared/PageTitle";

describe('PageTitle', () => { 
  it('Should display whatever is passed into it with an h2 tag', () => {
    const testTitle = "Testing";
    render(<PageTitle title={testTitle} />);
    expect(screen.getByText(testTitle)).toBeInTheDocument();
  })
})