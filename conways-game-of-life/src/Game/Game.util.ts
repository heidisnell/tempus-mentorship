function getNumNeighbors(row: number, col: number, generation: boolean[][]) {
  const numRows = generation.length;
  const numCols = generation[0].length;
  let numNeighbors = 0;
  for (let r = Math.max(0, row - 1); r <= Math.min(numRows - 1, row + 1); r++) {
    for (
      let c = Math.max(0, col - 1);
      c <= Math.min(numCols - 1, col + 1);
      c++
    ) {
      if (r === row && c === col) {
        continue;
      } else if (generation[r][c] === true) {
        numNeighbors++;
      }
    }
  }
  return numNeighbors;
}

function getNeighborArray(generation: boolean[][]) {
  const numRows = generation.length;
  const numCols = generation[0].length;
  let numNeighborArray: number[][] = Array(numRows)
    .fill(0)
    .map((_) => {
      return new Array(numCols).fill(0);
    });
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      numNeighborArray[r][c] = getNumNeighbors(r, c, generation);
    }
  }
  return numNeighborArray;
}

function getNextGeneration(generation: boolean[][]) {
  const numRows = generation.length;
  const numCols = generation[0].length;
  const neighborArray: number[][] = getNeighborArray(generation);
  let nextGeneration: boolean[][] = Array(numRows)
    .fill(false)
    .map((_) => {
      return new Array(numCols).fill(false);
    });
  let numNeighbors: number;
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      numNeighbors = neighborArray[r][c];
      if (numNeighbors < 2 || numNeighbors > 3) {
        nextGeneration[r][c] = false;
      } else if (numNeighbors === 3) {
        nextGeneration[r][c] = true;
      } else {
        nextGeneration[r][c] = generation[r][c];
      }
    }
  }
  return nextGeneration;
}

export { getNumNeighbors, getNeighborArray, getNextGeneration };
