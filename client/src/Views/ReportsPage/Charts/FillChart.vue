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
  tableColor1,
  tableColor2,
  tableColor3,
  tableColor4,
  tableColor5,
  tableColor6,
  tableColor7,
  tableColor8,
  tableColor9,
  tableColor10,
  tableColorWhite,
} from '../../../assets/styles/variables.scss';
import moment from 'moment';
moment().format();

export default {
  name: 'FillChart',
  props: ['data', 'dateRange'],
  data() {
    return {
      chartOptions: {
        chart: {
          type: 'area',
          stacked: false,
          width: 'auto',
          toolbar: {
            autoSelected: 'zoom',
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
        colors: [
          tableColor1,
          tableColor2,
          tableColor3,
          tableColor4,
          tableColor5,
          tableColor6,
          tableColor7,
          tableColor8,
          tableColor9,
          tableColor10,
        ],
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
          strokeColor: tableColorWhite,
          strokeWidth: 3,
          strokeOpacity: 1,
          fillOpacity: 1,
          hover: {
            size: 6,
          },
        },
        xaxis: {
          type: 'datetime',
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            style: {
              colors: tableColorWhite,
            },
          },
        },
        yaxis: {
          labels: {
            offsetX: 14,
            offsetY: -5,
            style: {
              colors: tableColorWhite,
            },
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
          theme: 'dark',
          x: {
            format: 'dd MMM yyyy',
          },
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
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
          type: 'gradient',
        },
      },
    };
  },
  computed: {
    series() {
      return this.formatSeries(this.data);
    },
    date() {
      const { startDate, endDate } = this.$props.dateRange;
      const [year, month] = endDate.split('-');
      const numDaysInMonth = new Date(year, month, 0).getDate();
      const start = moment(startDate + '-01');
      const end = moment(endDate + '-' + numDaysInMonth);
      const daysRange = end.diff(start, 'days');

      return {
        range: daysRange > 0 ? daysRange : 0,
        startDate: parseInt(start.format('x')),
        endDate: `${endDate}-${numDaysInMonth}`,
      };
    },
  },
  methods: {
    formatSeries(data) {
      // order chronologically
      const chronological = data.sort((b, a) => a.date - b.date);

      // loop over chronological shoutouts,
      // fill object with company values for keys set to array of zeros length of date range
      const series = this.createInitialSeries(chronological, this.date.range);

      // loop over with the date.range, go through each day and check to see if any shoutouts match that day
      // if yes, go into series object and incremement the corresponding element in correct value array
      this.updateSeries(series, chronological, this.date.range);

      // loop over series object and create correctly formatted data series for graph
      return this.createFinalSeries(series, this.date.range);
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
        let dateToCheck = new Date(this.date.endDate);
        const pastDate = dateToCheck.getDate() - i;
        dateToCheck.setDate(pastDate);
        dateToCheck = dateToCheck.toISOString().split('T')[0];

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
    generateDayWiseTimeSeries(value, count) {
      var i = 0;
      var series = [];
      var x = this.date.startDate;
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

<style lang="scss" scoped></style>
