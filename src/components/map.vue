<template>
  <div id="map" />
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
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
    }
  }
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>