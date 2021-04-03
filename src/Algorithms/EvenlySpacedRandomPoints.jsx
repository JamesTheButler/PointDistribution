import { getRandom } from "./Random";

export const generateEvenlySpacedRandomPoints = (
  gridWidth,
  gridHeight,
  pointCount
) => {
  const points = [];

  const rects = divideRect(gridWidth, gridHeight, pointCount);
  for (let i = 0; i < pointCount; i++) {
    points.push([
      getRandom(rects[i][0], rects[i][0] + rects[i][2]),
      getRandom(rects[i][1], rects[i][1] + rects[i][3]),
    ]);
  }

  return points;
};

const generatePoints = (width, height, pointCount) => {
  console.log("generatePoints");
  var i = 0;
  var points_x = new Array();
  var points_y = new Array();
  var rects = pointCount;
  console.log("length " + rects.length);
  for (i = 0; i < pointCount; i++) {}
  //drawPoints(points_x, points_y, pointCount);
};

const findBestDivider = (number, aspectRatio) => {
  var i = 0;
  var result = null;
  for (i = 1; i <= number; i++) {
    if (number % i == 0) {
      var div = number / i;
      if (
        result == null ||
        Math.abs(i / div - aspectRatio) <
          Math.abs(result[0] / result[1] - aspectRatio)
      ) {
        result = [i, div];
      } else {
        break;
      }
    }
  }
  return result;
};

const divideRect = (size_x, size_y, count) => {
  console.log("divideRect");

  var x_count = findBestDivider(count);
  var y_count = count / x_count;
  var rect_size = [size_x / x_count, size_y / y_count];
  var rects = new Array();
  var i, j;

  for (i = 0; i < x_count; i++) {
    for (j = 0; j < y_count; j++) {
      rects.push(
        new Array(
          i * rect_size[0],
          j * rect_size[1],
          rect_size[0],
          rect_size[1]
        )
      );
    }
  }
  return rects;
};
