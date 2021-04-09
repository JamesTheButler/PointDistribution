import { getRandom } from "./Random";

export const generateEvenlySpacedRandomPoints = (mapWidth, mapHeight, cellSize) => {
  const points = [];

  const gridWidth = Math.ceil(mapWidth / cellSize);
  const gridHeight = Math.ceil(mapHeight / cellSize);

  for (let x = 0; x < gridWidth; x++) {
    for (let y = 0; y < gridHeight; y++) {
      const newPoint = [getRandom(x * cellSize, (x + 1) * cellSize), getRandom(y * cellSize, (y + 1) * cellSize)];
      if ((x == gridWidth - 1 || y == gridHeight - 1) && (newPoint[0] > mapWidth || newPoint[1] > mapHeight)) continue;
      points.push(newPoint);
    }
  }

  console.log(points.length + " points generated with even spacing");
  return points;
};
