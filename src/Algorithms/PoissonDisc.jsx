import { getRandom } from "./Random";

// Based on https://www.jasondavies.com/poisson-disc/

export const generatePoissonDiscPoints = (mapWidth, mapHeight, r, k) => {
  const activePointIds = [];
  const points = [];
  const cellSize = r * Math.SQRT1_2;
  const gridWidth = Math.ceil(mapWidth / cellSize);
  const gridHeight = Math.ceil(mapHeight / cellSize);
  const grid = Array.from(Array(gridWidth), () => new Array(gridHeight));
  console.log(
    "mapwidth " +
      mapWidth +
      "\n mapHeight " +
      mapHeight +
      "\ngridwidth " +
      gridWidth +
      "\n grid height " +
      gridHeight +
      "\n cellsize" +
      cellSize +
      "\n readius " +
      r
  );
  console.log(grid);

  // start point
  //if (points.length === 0) {
  addPoint(points, activePointIds, grid, cellSize, [getRandom(0, mapWidth), getRandom(0, mapHeight)]);
  //}
  //TODO: DO WHILE QUEUE IS NOT EMPTY
  var COUNT = 0;
  while (activePointIds.length > 0) {
    // grab random point

    //for (var i = 0; i < 10; i++) {
    const idid = Math.floor(getRandom(0, activePointIds.length - 1)); // great name dude
    const pointId = activePointIds[idid];
    const point = points[pointId];
    for (let i = 0; i < k; i++) {
      const angle = 2 * Math.PI * Math.random();
      const radius = getRandom(r, 2 * r);
      const x = point[0] + radius * Math.cos(angle);
      const y = point[1] + radius * Math.sin(angle);
      if (x >= 0 && y >= 0 && x < mapWidth && y < mapHeight && !isNearOtherPoints(grid, cellSize, [x, y], r)) {
        addPoint(points, activePointIds, grid, cellSize, [x, y]);
        break;
      }

      //remove point from active list if none of 'k' points could be placed
      if (i === k - 1) {
        activePointIds[idid] = activePointIds[activePointIds.length - 1];
        activePointIds.pop();
      }
    }
  }

  console.log(points.length + " poisson-disc points generated");
  return points;
};

const addPoint = (pointList, activePointList, grid, cellSize, point) => {
  pointList.push(point);
  activePointList.push(pointList.length - 1);
  grid[Math.floor(point[0] / cellSize)][Math.floor(point[1] / cellSize)] = point;
};
/*activePointList.push(point);
  const gridIdX = Math.floor(point[0] / cellSize);
  const gridIdY = Math.floor(point[1] / cellSize);
  grid[gridIdX][gridIdY] = point;
  console.log("point " + point + " at grid pos " + gridIdX + "," + gridIdY);*/

// Determines whether a given point is within range of an occupied grid cell.
const isNearOtherPoints = (grid, cellSize, point, r) => {
  const gridCell = [Math.floor(point[0] / cellSize), Math.floor(point[1] / cellSize)];
  const minCell = [Math.max(0, gridCell[0] - 2), Math.max(0, gridCell[1] - 2)];
  const maxCell = [Math.min(grid.length, gridCell[0] + 2), Math.min(grid[0].length, gridCell[1] + 2)];

  // step through vinicity of the current gridcell
  for (let i = minCell[0]; i < maxCell[0]; i++) {
    for (let j = minCell[1]; j < maxCell[1]; j++) {
      const currCell = grid[i][j];
      if (currCell) {
        const dx = currCell[0] - point[0];
        const dy = currCell[1] - point[1];
        if (dx * dx + dy * dy <= r * r) return true;
      }
    }
  }
  return false;
};
