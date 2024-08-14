const { isPrime, fibonacci, isEven, cars } = require("../../util")

describe("This is a test suite", () => {
    it("This is a test case to verify isPrime", () => {
        expect(isPrime(5)).toBe(true);
        expect(isPrime(6)).toBe(false);
        expect(isPrime(3)).toBe(true);
        console.log("It-1")
    })
    it("This is a test case to verify fibonacci", () => {
        expect(fibonacci(3)).toEqual([0, 1, 1, 2]);
        console.log("It-2")
    })
    it("This is a test case to verify isEven", () => {
        expect(isEven(2)).toBe(true);
        expect(isEven(3)).toBe(false);
        expect(isEven(3)).not.toBe(true);
        console.log("It-3")
    })
    it("This is a test case to verify toContain", () => {
        expect(cars).toContain('tata')
        expect(cars).not.toContain('audi')
        console.log("It-4")
    })

    beforeAll(() => {
        console.log('This is Before All')
    })
    beforeEach(() => {
        console.log('This is Before Each')
    })
    afterEach(() => {
        console.log('This is After Each')
    })
    afterAll(() => {
        console.log('This is After All')
    })
})