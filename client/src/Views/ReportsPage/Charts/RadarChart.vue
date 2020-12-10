<template>
  <div>
    <apexchart
      height="400"
      width="100%"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script>
import {
  tableColorBlueGrey,
  tableColorDarkGrey,
  tableColorLightGrey,
  tableColorWhite,
} from '../../../assets/styles/variables.scss';

export default {
  name: 'RadarChart',
  props: ['data'],
  computed: {
    quantities() {
      return this.data.map((user) => user.quantity);
    },
    names() {
      return this.data.map((user) => user.name);
    },
    series() {
      return [
        {
          name: 'Monthly quantity',
          data: this.quantities,
        },
      ];
    },
    chartOptions() {
      return {
        chart: {
          height: 350,
          type: 'radar',
        },
        xaxis: {
          categories: this.names,
        },
        plotOptions: {
          radar: {
            size: 120,
            polygons: {
              strokeColors: tableColorDarkGrey,
              fill: {
                colors: [tableColorLightGrey, tableColorWhite],
              },
            },
          },
        },
        tooltip: {
          theme: 'dark',
          y: {
            formatter: function(val) {
              return val;
            },
          },
        },
        yaxis: {
          min: 0,
          max: this.quantities[0] + 2,
          forceNiceScale: true,
          labels: {
            style: {
              colors: [tableColorBlueGrey],
            },
            formatter: function(val, i) {
              if (i % 2 === 0) {
                return val;
              } else {
                return '';
              }
            },
          },
        },
      };
    },
  },
  data() {
    return {
      options: {
        chart: {
          height: 350,
          type: 'radar',
        },
        xaxis: {
          categories: this.names,
        },
      },
    };
  },
  watch: {
    data: {
      immediate: true,
      handler(newValue) {
        this.newSeries = newValue;
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
