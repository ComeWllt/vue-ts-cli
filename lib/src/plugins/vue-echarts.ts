import Vue from 'vue';
import ECharts from 'vue-echarts/components/ECharts.vue';

/*
Documentation: https://echarts.apache.org/api.html#echarts

Charts and components must be imported individually.
*/

import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/dataZoom';

Vue.component('v-chart', ECharts);
