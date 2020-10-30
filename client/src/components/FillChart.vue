<template>
  <div>
    <!-- {{ formatShouts(data) }} -->
    <apexchart :options="options" :series="options.series" />
  </div>
</template>

<script>
export default {
  name: "FillChart",
  props: ["data"],
  data() {
    return {
      options: {
        chart: {
          type: "area",
          stacked: false,
          toolbar: {
            autoSelected: "zoom",
            show: true,
          },
          dropShadow: {
            enabled: true,
            enabledSeries: [0],
            top: -2,
            left: 2,
            blur: 5,
            opacity: 0.06,
          },
        },
        colors: ["#00E396", "#0090FF", "#FF5733"],
        dataLabels: {
          enabled: true,
        },
        series: [
          {
            name: "Total Views",
            data: this.generateDayWiseTimeSeries(0, 18),
          },
          {
            name: "Unique Views",
            data: this.generateDayWiseTimeSeries(1, 18),
          },
          {
            name: "Separated Views",
            data: this.generateDayWiseTimeSeries(2, 18),
          },
        ],
        markers: {
          size: 0,
          strokeColor: "#fff",
          strokeWidth: 3,
          strokeOpacity: 1,
          fillOpacity: 1,
          hover: {
            size: 6,
          },
        },
        xaxis: {
          type: "datetime",
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          labels: {
            offsetX: 14,
            offsetY: -5,
          },
          tooltip: {
            enabled: true,
          },
        },
        grid: {
          padding: {
            left: -5,
            right: 5,
          },
        },
        tooltip: {
          fillSeriesColor: true,
          theme: "dark",
          x: {
            format: "dd MMM yyyy",
          },
        },
        legend: {
          position: "top",
          horizontalAlign: "left",
          onItemClick: {
            toggleOnDataSeries: true,
          },
          onItemHover: {
            highlightDataSeries: true,
          },
          labels: {
            useSeriesColors: true,
          },
        },
        fill: {
          type: "gradient",
        },
      },
    };
  },
  methods: {
    // formatShouts(shouts, filterValue) {
    //   let formatted = [];

    //   return shouts;
    // },
    generateDayWiseTimeSeries(s, count) {
      var values = [
        [4, 3, 10, 9, 29, 19, 25, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5],
        [2, 3, 8, 7, 22, 16, 23, 7, 11, 5, 12, 5, 10, 4, 15, 2, 6, 2],
        [10, 6, 7, 4, 13, 14, 12, 8, 11, 15, 2, 20, 2, 3, 13, 8, 4, 12],
      ];
      var i = 0;
      var series = [];
      var x = new Date("11 Nov 2012").getTime();
      while (i < count) {
        series.push([x, values[s][i]]);
        x += 86400000;
        i++;
      }
      return series;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>