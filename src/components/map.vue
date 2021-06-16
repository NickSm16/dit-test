<template>
  <div id="map"></div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import admin_units from "../../public/admin_units.json";

var options = (color) => (
  {
    radius: 8,
    fillColor: color,
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  }
);
export default {
  name: "Map",
  props: ["points"],
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
  methods: {
    initMap: function () {
      this.map = L.map("map").setView(this.center, 9);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        this.map
      );
      L.geoJSON(admin_units, { color: "#000000", weight: 1 }).addTo(this.map);
    },

    addPoints: function (points) {
      this.markers.forEach((group) => {
        group.clearLayers();
      });

      for (let unit in points) {
        if (points[unit].active) {
          var group = L.geoJSON(points[unit].features, {
            pointToLayer: function(_feature, latlng) {
              return L.circleMarker(latlng, options(points[unit].color));
            }
          }).addTo(this.map);
          this.markers.push(group);
        }
      }
    },
  },
  mounted() {
    this.initMap();
  },
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>