import { getRandom } from "./Random";

export const generateEvenlySpacedRandomPoints = (
  mapWidth,
  mapHeight,
  pointCount
) => {
  var i = 0;
  const points = [];
  // hack...
  if (pointCount >= 1000) {
    pointCount = Math.ceil(pointCount / 1000) * 1000;
  } else if (pointCount >= 100) {
    pointCount = Math.ceil(pointCount / 100) * 100;
  }
  var bestDividers = findBestDivider(pointCount, mapHeight / mapWidth);
  var x_count = bestDividers[0];
  var y_count = bestDividers[1];
  var rectSize = [mapWidth / x_count, mapHeight / y_count];

  for (let x = 0; x < x_count; x++) {
    for (let y = 0; y < y_count; y++) {
      points.push([
        getRandom(x * rectSize[0], (x + 1) * rectSize[0]),
        getRandom(y * rectSize[1], (y + 1) * rectSize[1]),
      ]);
    }
  }

  console.log(pointCount + " points generated with even spacing");
  return points;
};

// finds the pair of dividers of a number whos ratio is closest to the given ratio
const findBestDivider = (number, targetRatio) => {
  var i = 0;
  var result = null;
  for (i = 1; i <= number; i++) {
    if (number % i == 0) {
      var divider = number / i;
      if (
        result == null ||
        Math.abs(i / divider - targetRatio) <
          Math.abs(result[0] / result[1] - targetRatio)
      ) {
        result = [i, divider];
      } else {
        break;
      }
    }
  }
  return result;
};
