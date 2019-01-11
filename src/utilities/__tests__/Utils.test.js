import * as Utils from "../Utils"

describe("Test Utils functions", () => {
  test("isSuccess:: true", () => {
    expect(Utils.isSuccess(200)).toBeTruthy()
  })
  test("isSuccess:: false", () => {
    expect(Utils.isSuccess(500)).toBeFalsy()
  })
})
