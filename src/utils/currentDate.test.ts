import { currentDate } from "./currentDate"

const todaysDate = new Date().toLocaleDateString()

describe("suite of tests for currentDate()", () => {
    test("today's date should be shown", () =>
        expect(currentDate()).toBe(todaysDate)
    )
})