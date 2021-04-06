import { getRandom } from "./Random";

// Based on https://www.jasondavies.com/poisson-disc/

export const generatePoissonDiscPoints = (mapWidth, mapHeight, r, k) => {
  const activePoints = [];
  const points = [];
  const cellSize = r * Math.SQRT1_2;
  const gridWidth = Math.ceil(mapWidth / cellSize);
  const gridHeight = Math.ceil(mapHeight / cellSize);
  const grid = new Array(gridWidth * gridHeight);
  console.log("gridwidth, grid height, cellsize, grid");
  console.log(gridWidth + "\n" + gridHeight + "\n" + cellSize + "\n");
  console.log(grid);
  // start point
  if (points.length == 0) {
    addPoint(points, activePoints, grid, mapWidth, mapHeight, cellSize, [
      getRandom(0, mapWidth),
      getRandom(0, mapHeight),
    ]);
  }
  //TODO: DO WHILE QUEUE IOS NOT EMPTY
  var COUNT = 0;
  //while (COUNT < 500) {
  //while (activePoints.length > 0) {
  // grab random point
  for (var i = 0; i < 100; i++) {
    const pointId = Math.floor(getRandom(0, activePoints.length - 1));
    const point = activePoints[pointId];
    // finding fitting candidate
    for (let i = 0; i < k; i++) {
      //generate possible candidate withing cirular annulus
      const angle = 2 * Math.PI * Math.random();
      const radius = getRandom(r, 2 * r);
      const x = point[0] + radius * Math.cos(angle);
      const y = point[1] + radius * Math.sin(angle);
      // accept valid first candidate
      console.log("accept candidates");
      if (
        x >= 0 &&
        y >= 0 &&
        x < mapWidth &&
        y < mapHeight &&
        !isWithinRangeOfSamples(
          grid,
          gridWidth,
          gridHeight,
          cellSize,
          [x, y],
          r
        )
      ) {
        addPoint(points, activePoints, grid, gridWidth, gridHeight, cellSize, [
          x,
          y,
        ]);
        var pointsLength = activePoints.length;
        activePoints[pointId] = activePoints[--pointsLength];
        activePoints.length--;
        COUNT++;
        console.log(activePoints.length + " active points");
      }
    }
  }

  console.log(points.length + " poisson-disc points generated");
  console.log(points);
  return points;
};

const addPoint = (
  pointList,
  activePointList,
  grid,
  gridWidth,
  gridHeight,
  cellSize,
  point
) => {
  pointList.push(point);
  activePointList.push(point);
  console.log(grid);
  const gridId =
    gridWidth * Math.floor(cellSize / point[0]) +
    gridHeight * Math.floor(cellSize / point[1]);
  console.log("gridid " + gridId);
  grid[gridId] = point;
};

const isWithinRangeOfSamples = (
  grid,
  gridWidth,
  gridHeight,
  cellSize,
  point,
  r
) => {
  const gridCell = [
    Math.floor(point[0] / cellSize),
    Math.floor(point[1] / cellSize),
  ];
  const minCell = [Math.max(0, gridCell[0] - 3), Math.max(0, gridCell[1] - 3)];
  const maxCell = [
    Math.min(gridWidth, gridCell[0] + 3),
    Math.min(gridHeight, gridCell[1] + 3),
  ];
  // step through vinicity of the current gridcell
  for (let i = minCell[0]; i < maxCell[0]; i++) {
    for (let j = minCell[1]; j < maxCell[1]; j++) {
      const s = grid[(i, j)];
      if (s) {
        console.log("YO");
        console.log(s);
        const dx = s[0] - point[0];
        const dy = s[1] - point[1];
        if (dx * dx + dy * dy <= r * r) return true;
      }
    }
  }
  return false;
};
