import { describe } from "node:test";
import test, { expect } from "playwright/test";
import calculateTotal from "../calculateTotal/calculateTotal"

describe("test calculateTotal", () => {
    test("normal input give normal output", () => {
        expect(calculateTotal("10, 20, 30")).toBe(60);
        expect(calculateTotal("1, 2, 3, 4, 5, 6, 7, 8")).toBe(36);
    })
    
    test("not normal input give not normal output", () => {
        expect(calculateTotal("1, 2, 3 4, ooo, 5o6")).toBe(11);
        expect(calculateTotal("apple")).toBe(0);
    })
    test("new lines", () => {
        expect(calculateTotal("1\n2,3\n4")).toBe(10);
    })
})