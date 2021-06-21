<template>
  <div class="wrapper">
    <div class="mapContainer">
      <Map :points="points" />
    </div>
    <div class="sidebar">
      <div class="btn-container">
        <button
          class="btn"
          @click="generate"
        >
          Сгенерировать
        </button>
      </div>
      <UnitChart
        :points="points"
        @toggleUnit="toggleUnit($event)"
      />
    </div>
  </div>
</template>

<script>
import * as turf from "@turf/turf";

import Map from "./components/Map.vue";
import UnitChart from "./components/Chart.vue";

import moscow from "../public/moscow.json";
import admin_units from "../public/admin_units.json";

export default {
  name: "App",
  components: {
    Map,
    UnitChart,
  },
  data() {
    return {
      points: {},
    };
  },
  methods: {
    generate: function () {
      this.points = generatePoints(100, moscow);
    },
    toggleUnit: function (unit) {
      const entity = Object.entries(this.points).map(([key, value]) => {
        let result = value;
        if (key === unit) {
          result = {
            ...value,
            active: !value.active
          }
        }
        return [key, result]
      })
      this.points = Object.fromEntries(entity);
    },
  },
};

function generatePoints(n, polygon) {
  const bbox = turf.bbox(polygon);
  let points = {
    "ЦАО": { active: true, color: "#ffd700", features: [] },
    "САО": { active: true, color: "#0000ff", features: [] },
    "СВАО": { active: true, color: "#4b0082", features: [] },
    "ВАО": { active: true, color: "#87cefa", features: [] },
    "ЮВАО": { active: true, color: "#800080", features: [] },
    "ЮАО": { active: true, color: "#ff0000", features: [] },
    "ЮЗАО": { active: true, color: "#00ffff", features: [] },
    "ЗАО": { active: true, color: "#00ff00", features: [] },
    "СЗАО": { active: true, color: "#cc5500", features: [] },
    "ТАО": { active: true, color: "#90ee90", features: [] },
    "НАО": { active: true, color: "#ffff00", features: [] },
    "ЗелАО": { active: true, color: "#87cefa", features: [] },
  };

  for (let i = 0; i < n; i++) {
    let point = turf.randomPoint(1, { bbox: bbox }).features[0];

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

.wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
}

.mapContainer {
  width: 100%;
  height: 100%;
}

.sidebar {
  width: 500px;
  height: 100%;
}

.btn-container {
  margin: 24px 0px;
  text-align: center;
}

.btn {
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid #007bff;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  color: #007bff;
  background-color: transparent;
}
</style>