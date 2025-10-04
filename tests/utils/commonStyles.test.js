import React from "react";
import { describe, it, expect } from "vitest";
import {BOX_CONTAINER_STYLING,BOX_TITLE_STYLING,INPUT_STYLING} from "../../src/utils/commonStyles";


describe('BOX_TITLE_STYLING', () => {
  it('Should contain a series of tailwind css text', () => {
    expect(BOX_TITLE_STYLING).toBe(
      "absolute top-0 left-10 bg-gray-400 font-semibold mb-5 text-center text-sm text-gray-950 rounded-xl px-3 py-1 -mt-4 dark:border-shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
    );
  })
})

describe("BOX_CONTAINER_STYLING", () => {
  it("Should contain a series of tailwind css text", () => {
    expect(BOX_CONTAINER_STYLING).toBe(
      "relative sm:mx-auto w-full mx-2 mb-15 p-2 border dark:border-gray-600 border-gray-900 rounded-lg bg-zinc-200 dark:bg-zinc-400"
    );
  });
});

describe("INPUT_STYLING", () => {
  it("Should contain a series of tailwind css text", () => {
    expect(INPUT_STYLING).toBe(
       "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-gray-800 dark:text-gray-300 dark:outline-white/10 dark:placeholder:text-gray-400 dark:focus:outline-indigo-500"
    );
  });
});