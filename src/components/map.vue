<template>
  <div id="map"></div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import admin_units from "../../public/admin_units.json"

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default {
  name: "Map",
  props: ['points'],
  data() {
    return {
      map: null,
      markers: null,
      center: [55.5836, 37.3854],
    };
  },
  watch: {
    points: function(value) {
      this.addPoints(value)
    }
  },
  methods: {
    initMap: function () {
      this.map = L.map("map").setView(this.center, 9);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(this.map);
      L.geoJSON(admin_units, {color: '#ff0000'}).addTo(this.map);
    },

    addPoints: function (points) {
      this.markers?.clearLayers();
      this.markers = L.geoJSON(points).addTo(this.map);
    } 
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