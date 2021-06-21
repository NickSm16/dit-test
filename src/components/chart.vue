<script>
import { Doughnut } from "vue-chartjs";

export default {
  name: "UnitChart",
  extends: Doughnut,
  props: {"points": Set},
  watch: {
    points: function (value) {
      let labels = [];
      let colors = [];
      let data = [];

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
  methods: {
    clickHandler: function (_event, elements) {
      if (elements.length) {
        const element = elements[0];
        const index = element._index;
        const unit = element._chart.data.labels[index];

        this.$emit('toggleUnit', unit)
      }
    },
  },
};
</script>