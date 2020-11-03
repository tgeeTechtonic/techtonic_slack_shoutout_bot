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
export default {
  name: "FillChart",
  props: ["data"],
  data() {
    return {
      dateRange: 30,
      chartOptions: {
        chart: {
          type: "area",
          stacked: false,
          width: "auto",
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
      // order chronologically and truncate data
      const chronological = this.sortByTimeAndTruncate(data, this.dateRange);
      console.log("chronological", chronological);
      // loop over chronological shoutouts,
      // fill object with company values for keys set to array of zeros length of date range
      const series = this.createInitialSeries(chronological, this.dateRange);

      // loop over with the dateRange, go through each day and check to see if any shoutouts match that day
      // if yes, go into series object and incremement the corresponding element in correct value array
      this.updateSeries(series, chronological, this.dateRange);

      // loop over series object and create correctly formatted data series for graph
      return this.createFinalSeries(series, this.dateRange);
    },
    createFinalSeries(seriesObj, seriesLimit) {
      let finalSeries = [];
      for (const value in seriesObj) {
        finalSeries.push({
          name: value,
          data: this.generateDayWiseTimeSeries(seriesObj[value], seriesLimit),
        });
      }
      return finalSeries;
    },
    updateSeries(seriesToUpdate, updateData, seriesLimit) {
      for (let i = seriesLimit; i >= 0; i--) {
        let dateToCheck = new Date();
        const pastDate = dateToCheck.getDate() - i;
        dateToCheck.setDate(pastDate);
        dateToCheck = dateToCheck.toISOString().split("T")[0];

        updateData.forEach((shoutout) => {
          if (shoutout.date === dateToCheck) {
            seriesToUpdate[shoutout.value][seriesLimit - i]++;
          }
        });
      }
      return seriesToUpdate;
    },
    createInitialSeries(orderedData, seriesLimit) {
      let series = {};

      orderedData.forEach((s) => {
        series[s.value]
          ? null
          : (series[s.value] = new Array(seriesLimit).fill(0));
      });

      return series;
    },
    sortByTimeAndTruncate(data, truncateValue) {
      return data.sort((b, a) => a.date - b.date).slice(0, truncateValue);
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