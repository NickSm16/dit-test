<script>
import { Doughnut } from "vue-chartjs";

export default {
  name: "UnitChart",
  extends: Doughnut,
  props: ["points"],
  methods: {
    clickHandler: function (event, elements) {
      if (elements.length) {
        var element = elements[0];
        var index = element._index;
        var unit = element._chart.data.labels[index];

        this.$emit('toggleUnit', unit)
      }
    },
  },
  watch: {
    points: function (value) {
      var labels = [];
      var colors = [];
      var data = [];

      for (let unit in value) {
        labels.push(unit);
        colors.push(value[unit].color);
        data.push(value[unit].features.length);
      }

      this.renderChart(
        {
          labels: labels,
          datasets: [
            {
              backgroundColor: colors,
              data: data,
            },
          ],
        },
        {
          onClick: (event, element) => this.clickHandler(event, element),
        }
      );
    },
  },
};
</script>