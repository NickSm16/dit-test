import * as turf from "@turf/turf";

console.log(turf.point([123, 53]))

// function generatePoint(n, polygon_coordinates) {
//     var polygon = turf.multiPolygon(polygon_coordinates);
//     var bbox = turf.bbox(polygon);
//     var points = [];
  
//     for (let i = 0; i < n; i++) {
//       var point = turf.randomPoint(1, { bbox });
  
//       if (turf.inside(point, polygon)) {
//         points.push(point);
//       } else {
//         i -= 1;
//       }
//     }
  
//     return points;
//   }
  
//   var coords = [
//     [
//       [36.8031012, 55.4408329],
//       [36.8113604, 55.436299],
//       [36.812585, 55.4351069],
//       [36.8161343, 55.4302984],
//       [36.8164114, 55.429923],
//       [36.8167848, 55.429926],
//     ],
//   ];
  
//   console.log(
//     generatePoint(5, coords)
//   );