<template>
  <div class="mapContainer">
    <Map v-bind:points="points" />
  </div>
  <div class="sidebar">
    <button @click="generate">Сгенерировать</button>
    <!-- <ul>
      <li v-for="(point, x) in points" :key="x">
        {{ point.properties.unit }}
        {{ point.geometry.coordinates }}
      </li>
    </ul> -->
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
      points: []
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
  var points = {
        "ЦАО": { active: true, color: "#ffd700", features: [] },
        "САО": { active: true, color: "#0000ff", features: [] },
        "СВАО": { active: true, color: "#4b0082", features: [] },
        "ВАО": { active: true, color: "#cc5500", features: [] },
        "ЮВАО": { active: true, color: "#800080", features: [] },
        "ЮАО": { active: true, color: "#ff0000", features: [] },
        "ЮЗАО": { active: true, color: "#00ffff", features: [] },
        "ЗАО": { active: true, color: "#00ff00", features: [] },
        "СЗАО": { active: true, color: "#ffff00", features: [] },
        "ТАО": { active: true, color: "#90ee90", features: [] },
        "НАО": { active: true, color: "#87cefa", features: [] },
        "ЗелАО": { active: true, color: "#87cefa", features: [] },
      };

  for (let i = 0; i < n; i++) {
    var point = turf.randomPoint(1, { bbox: bbox }).features[0];

    if (turf.inside(point, polygon)) {
      for (let unit of admin_units.features) {
        if (turf.inside(point, unit)) {
          points[unit.properties.ref].features.push(point);
          break;
        }
      }
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