import { getNextGeneration } from "./Game.util";

describe("#getNextGeneration", () => {
  it("should return false", () => {
    // setup
    const currentGeneration = [
      [false, false],
      [false, false],
    ];
    // call the function
    const result = getNextGeneration(currentGeneration);
    // verify the function works
    expect(result).toStrictEqual([
      [false, false],
      [false, false],
    ]);
  });

  it("should also return false", () => {
    // setup
    const currentGeneration = [
      [true, true],
      [false, false],
    ];
    // call the function
    const result = getNextGeneration(currentGeneration);
    // verify the function works
    expect(result).toStrictEqual([
      [false, false],
      [false, false],
    ]);
  });

  it("should return true", () => {
    // setup
    const currentGeneration = [
      [true, false],
      [true, true],
    ];
    // call the function
    const result = getNextGeneration(currentGeneration);
    // verify
    expect(result).toStrictEqual([
      [true, true],
      [true, true],
    ]);
  });

  it("should kill inner cells", () => {
    // setup
    const currentGeneration = [
      [true, true, true],
      [true, true, true],
      [true, true, true],
    ];
    // call the function
    const result = getNextGeneration(currentGeneration);
    // verify
    expect(result).toStrictEqual([
      [true, false, true],
      [false, false, false],
      [true, false, true],
    ]);
  });
});
