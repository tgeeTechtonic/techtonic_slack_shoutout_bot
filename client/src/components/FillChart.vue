<template>
  <div>
    <apexchart
      height="400"
      width="800"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script>
export default {
  name: "FillChart",
  props: ["data"],
  data() {
    return {
      dateRange: 30,
      chartOptions: {
        chart: {
          type: "area",
          stacked: true,
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
        colors: ["#accc20", "#1aa5ca", "#f77046", "#ADB5BD", "#AF125A"],
        dataLabels: {
          enabled: false,
        },
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
  computed: {
    series() {
      return this.formatSeries(this.data);
    },
    initialStartDate() {
      const startDate = new Date();
      const pastDate = startDate.getDate() - this.dateRange;
      startDate.setDate(pastDate);
      return startDate.toDateString();
    },
  },
  methods: {
    formatSeries(data) {
      // order chronologically
      // loop over incoming shoutout array and fill an object with values for keys and set to array of 30 zeros
      // loop over with the dateRange, go through each day and check to see if any shoutouts match that day
      // if they do, go into formattedSeries object and incrememnt the correspondin element in the correct value array
      // loop over formattedSeries object and push all arrays into an array of arrays in order for the graph to use

      let formattedSeries = {};

      const chronological = data
        .sort((b, a) => a.date - b.date)
        .slice(0, this.dateRange);

      chronological.forEach((s) => {
        formattedSeries[s.value]
          ? null
          : (formattedSeries[s.value] = new Array(this.dateRange).fill(0));
      });

      for (let i = this.dateRange; i >= 0; i--) {
        const date = new Date();
        const pastDate = date.getDate() - i;
        date.setDate(pastDate);
        const dateToCheck = date.toDateString();
        chronological.forEach((s) => {
          if (s.date === dateToCheck) {
            formattedSeries[s.value][this.dateRange - i]++;
          }
        });
      }

      let seriesValues = [];

      for (const value in formattedSeries) {
        seriesValues.push({
          name: value,
          data: this.generateDayWiseTimeSeries(
            formattedSeries[value],
            this.dateRange
          ),
        });
      }

      return seriesValues;
    },
    generateDayWiseTimeSeries(value, count) {
      var i = 0;
      var series = [];
      var x = new Date(this.initialStartDate.slice(4)).getTime();
      while (i < count) {
        series.push([x, value[i]]);
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