import { getRandom } from "./Random";

export const generateEvenlySpacedRandomPoints = (
  gridWidth,
  gridHeight,
  pointCount
) => {
  var i = 0;
  const points = [];

  var bestDividers = findBestDivider(pointCount, gridHeight / gridWidth);
  var x_count = bestDividers[0];
  var y_count = bestDividers[1];
  var rectSize = [gridWidth / x_count, gridHeight / y_count];

  for (let x = 0; x < x_count; x++) {
    for (let y = 0; y < y_count; y++) {
      points.push([
        getRandom(y * rectSize[1], (y + 1) * rectSize[1]),
        getRandom(x * rectSize[0], (x + 1) * rectSize[0]),
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
