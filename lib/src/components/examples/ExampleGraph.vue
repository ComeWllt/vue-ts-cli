<template>
  <v-card>
    <v-card-title>
      <h3 class="headline">Graph Example</h3>
    </v-card-title>
    <v-layout justify-center>
      <figure>
        <v-chart :options="options" auto-resize/>
      </figure>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ECharts from 'vue-echarts/components/ECharts.vue';

@Component({ components: { ECharts } })
export default class ExampleGraph extends Vue {
  private data = [
    ['2019-01-02T03:25:46.150Z', 820],
    ['2019-01-04T06:34:34.150Z', 932],
    ['2019-01-05T02:56:23.150Z', 901],
    ['2019-01-10T12:09:05.150Z', 934],
    ['2019-01-11T07:23:57.150Z', 1290],
    ['2019-01-11T20:14:01.150Z', 1330],
    ['2019-01-15T23:26:40.150Z', 1320],
  ];
  // options shoud be a get method if dynamic
  private options = {
    tooltip: {
      trigger: 'axis',
      position: (pt: number[]) => {
        return [pt[0], '10%'];
      },
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none',
          title: {
            zoom: 'zoom',
            back: 'back',
          },
        },
        restore: {
          title: 'reset',
        },
        saveAsImage: {
          title: 'save',
          name: 'example-graph',
        },
      },
    },
    grid: {
      left: '10%',
      right: '10%',
      top: '12%',
      bottom: '20%',
    },
    xAxis: {
      type: 'time',
      name: 'time',
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          width: 0.1,
        },
      },
      splitLine: {
        lineStyle: {
          width: 0.5,
        },
      },
    },
    yAxis: {
      name: 'Value',
      nameLocation: 'end',
      type: 'value',
      axisLine: {
        lineStyle: {
          width: 0.1,
        },
      },
      splitLine: {
        lineStyle: {
          width: 0.5,
        },
      },
    },
    dataZoom: [
      {
        type: 'slider',
        startValue: this.data[0][0],
        endValue: this.data[this.data.length - 1][0],
      },
      {
        start: 0,
        end: 10,
        handleIcon:
          'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        handleSize: '80%',
        handleStyle: {
          color: '#fff',
          shadowBlur: 3,
          shadowColor: 'rgba(0, 0, 0, 0.6)',
          shadowOffsetX: 2,
          shadowOffsetY: 2,
        },
      },
    ],
    series: [
      {
        name: 'Value',
        type: 'line',
        sampling: 'average',
        symbolSize: 7,
        itemStyle: {
          type: 'default',
          color: '#ef6262',
        },
        lineStyle: {
          normal: {
            color: '#ef6262',
            opacity: 1,
            width: 4,
          },
        },
        data: this.data,
      },
    ],
  };
}
</script>


<style scoped>
figure {
  width: 100%;
  margin: 2em auto;
  padding: 1 1em;
}

figure .echarts {
  width: 95%;
  min-width: 150px;
}
</style>
