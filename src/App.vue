<template>
  <div class="wrapper">
    <div class="mapContainer">
      <Map 
        ref="map"
        :points="points"
      />
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
import Map from "./components/Map.vue";
import UnitChart from "./components/Chart.vue";

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
      this.points = this.$refs.map.generate();
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