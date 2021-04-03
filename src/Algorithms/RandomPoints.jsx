import { getRandom } from "./Random";

export const generateRandomPoints = (gridWidth, gridHeight, pointCount) => {
  const points = [];
  // set points
  for (let i = 0; i < pointCount; i++) {
    points.push([getRandom(0, gridHeight), getRandom(0, gridWidth)]);
  }
  console.log(pointCount + " random points generated");
  return points;
};
