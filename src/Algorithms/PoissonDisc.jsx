import { getRandom } from "./Random";

// Based on https://www.jasondavies.com/poisson-disc/
/*export const generatePoissonDiscPoints = (
  gridWidth,
  gridHeight,
  pointCount,
  r,
  k
) => {*/

export const generatePoissonDiscPoints = (
  canvasWidth,
  canvasHeight,
  pointCount,
  r,
  k
) => {
  const points = [];
  const cellSize = r * Math.SQRT1_2;
  const gridWidth = Math.ceil(canvasWidth / cellSize);
  const gridHeight = Math.ceil(canvasHeight / cellSize);
  const grid = new Array(gridWidth * gridHeight);
  console.log("gridwidth, grid height, cellsize, grid");
  console.log(gridWidth + "\n" + gridHeight + "\n" + cellSize + "\n");
  console.log(grid);
  // start point
  const pt = [getRandom(0, canvasWidth), getRandom(0, canvasHeight)];
  console.log(pt);
  if (points.length == 0)
    addPoint(points, grid, gridWidth, gridHeight, cellSize, pt);
  else {
    // grab random point
    const p = points[getRandom(0, points.length - 1)];
    // finding fitting candidate
    for (let i = 0; i < k; i++) {
      //generate possible candidate withing cirular annulus
      const angle = 2 * Math.PI * Math.random();
      const radius = getRandom(r, 2 * r);
      const x = p[0] + radius * Math.cos(angle);
      const y = p[1] + radius * Math.sin(angle);
      // accept valid candidate
      if (
        x >= 0 &&
        y >= 0 &&
        x < canvasWidth &&
        y < canvasHeight &&
        false
        //!isWithinRangeOfSamples()
      )
        addPoint(points, grid, gridWidth, gridHeight, cellSize, [x, y]);
    }
  }

  console.log(pointCount + " poisson-disc points generated");
  console.log(points);
  return points;
};

const addPoint = (pointList, grid, gridWidth, gridHeight, cellSize, point) => {
  pointList.push(point);
  console.log(grid);
  const gridId =
    gridWidth * (cellSize / point[0]) + gridHeight * (cellSize / point[1]);
  console.log(gridId);
  grid[gridId] = point;
};

const isWithinRangeOfSamples = (grid, x, y, r) => {};
