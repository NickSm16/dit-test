<template>
  <div class="mapContainer">
    <Map v-bind:points="points" />
  </div>
  <div class="sidebar">
    <button @click="generate">Сгенерировать</button>
    <ul>
      <li v-for="(point, x) in points" :key="x">
        {{ point.properties.unit }}
        {{ point.geometry.coordinates }}
      </li>
    </ul>
  </div>
</template>

<script>
import * as turf from "@turf/turf";
import Map from "./components/map.vue";
import moscow from "../public/moscow.json";
import admin_units from "../public/admin_units.json";

export default {
  name: "App",
  components: {
    Map,
  },
  data() {
    return {
      points: [],
    };
  },
  methods: {
    generate: function () {
      this.points = generatePoints(100, moscow);
    },
  },
};

function generatePoints(n, polygon) {
  var bbox = turf.bbox(polygon);
  var points = [];

  for (let i = 0; i < n; i++) {
    var point = turf.randomPoint(1, { bbox: bbox }).features[0];

    if (turf.inside(point, polygon)) {
      point.properties["show"] = true;
      for (let unit of admin_units.features) {
        if (turf.inside(point, unit)) {
          point.properties["unit"] = unit.properties.ref;
          break;
        }
      }

      points.push(point);
    } else {
      i -= 1;
    }
  }

  return points;
}
</script>

<style>
body {
  margin: 0;
}

#app {
  width: 100vw;
  height: 100vh;
  display: flex;
}

.mapContainer {
  width: 100%;
  height: 100%;
}

.sidebar {
  width: 600px;
  height: 100%;
}
</style>