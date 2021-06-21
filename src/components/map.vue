<template>
  <div id="map" />
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import * as turf from "@turf/turf";
import moscow from "../../public/moscow.json";
import admin_units from "../../public/admin_units.json";

export default {
  name: "Map",
  props: {"points": Set},
  data() {
    return {
      map: null,
      markers: [],
      center: [55.5836, 37.3854],
    };
  },
  watch: {
    points: function (value) {
      this.addPoints(value);
    },
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap: function () {
      this.map = L.map("map").setView(this.center, 9);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        this.map
      );
      L.geoJSON(admin_units, {
        color: "#000000",
        weight: 1,
        fillOpacity: 0.1,
      }).addTo(this.map);
    },

    addPoints: function (points) {
      this.markers.forEach((group) => {
        group.clearLayers();
      });

      for (let unit in points) {
        if (points[unit].active) {
          var group = L.geoJSON(points[unit].features, {
            pointToLayer: function (_feature, latlng) {
              return L.circleMarker(latlng, {
                radius: 5,
                color: "#000",
                fillColor: points[unit].color,
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8,
              });
            },
          }).addTo(this.map);
          this.markers.push(group);
        }
      }
    },
    
    generate: function (n=100, polygon=moscow) {
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
    },
  }
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>