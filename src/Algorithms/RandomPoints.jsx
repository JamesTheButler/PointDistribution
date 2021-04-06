import { getRandom } from "./Random";

export const generateRandomPoints = (mapWidth, mapHeight, pointCount) => {
  const points = [];
  // set points
  for (let i = 0; i < pointCount; i++) {
    points.push([getRandom(0, mapWidth), getRandom(0, mapHeight)]);
  }
  console.log(pointCount + " random points generated");
  return points;
};
