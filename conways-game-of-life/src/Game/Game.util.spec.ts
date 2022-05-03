import { getNextGeneration } from "./Game.util";

describe("#getNextGeneration", () => {
  it("should return false", () => {
    // setup
    const currentGeneration = [
      [false, false],
      [false, false],
    ];
    // calling the function
    const result = getNextGeneration(currentGeneration);
    // verifying the function works
    expect(result).toStrictEqual([
      [false, false],
      [false, false],
    ]);
  });
});
