/*
 * -------------------------------------------------------
 * @author   hzwangdong5(hzwangdong5@corp.netease.com)
 * -------------------------------------------------------
 */

var RGChart;

(function (rg, e, _) {

  var dom = rg.dom;

  RGChart = rg.extend({
      name: 'chart',
      template: '<div ref="container"></div>',
      config: function () {
        var self = this;
        var config = self.data.config;

        extend(self.data.config, {
          theme: 'dark',
          event: {},
          dataZoom: true,
          toolbox: true,
          name: '',
          link: ''
        }, false);

        if (_.isBoolean(config.dataZoom) && config.dataZoom) {
          this._setDataZoom();
        } else {
          error('dataZoom');
        }

        if (_.isBoolean(config.toolbox) && config.toolbox) {
          this._setToolbox();
        } else {
          error('toolbox');
        }
      },
      init: function () {
        this._initClass();
        this.render();

        var self = this;
        this.$on('$destroy', function () {
          RGChart.cache[self.data.config.name] = null;
        })
      },
      getInstance: function () {
        return this.data.chart;
      },
      render: function () {
        var self = this;
        var container = self.$refs.container;
        var config = self.data.config;
        var option = self.data.option;

        setTimeout(function () {
          var chart = e.init(container, config.theme || '');
          chart.setOption(option);

          if (_.isObject(config.event)) {
            for (var k in config.event) {
              chart.on(k, config.event[k]);
            }
          }

          self.data.chart = chart;

          if (_.isString(config.name) && !_.isEmpty(config.name)) {
            RGChart.cache[config.name] = chart;
          }
          if (_.isString(config.link) && !_.isEmpty(config.link)) {
            self._bindLink();
          }
        }, 0)
      },
      _setDataZoom: function () {
        extend(this.data.option, {
          dataZoom: [
            {
              type: 'slider',
              xAxisIndex: 0,
              start: 0,
              end: 100
            },
            {
              type: 'inside',
              xAxisIndex: 0,
              start: 0,
              end: 100
            }
          ]
        })
      },
      _setToolbox: function () {
        extend(this.data.option, {
          toolbox: {
            show: true,
            left: 'right',
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          }
        })
      },
      _initClass: function () {
        var self = this;
        var container = self.$refs.container;
        var config = self.data.config;
        var className = self.data.class;

        if (_.isString(self.data.class) && !_.isEmpty(self.data.class)) {
          dom.addClass(container, className);
        } else {
          var w = config.width || 480 + 'px';
          var h = config.height || 320 + 'px';
          container.style.width = w;
          container.style.height = h;
        }
      },
      _bindLink: function () {
        var config = this.data.config;
        var chart = this.data.chart;
        var currentIndex = -1;
        chart.on('mouseout', function () {
          var lChart = RGChart.cache[config.link];
          if (_.isEmpty(lChart)) {
            console.error('link to chart obj is not existed');
          } else {
            lChart.dispatchAction({
              type: 'downplay',
              seriesIndex: 0,
              dataIndex: currentIndex
            });
            lChart.dispatchAction({
              type: 'hideTip',
              seriesIndex: 0,
              dataIndex: currentIndex
            });
          }
        })

        chart.on('mouseover', function (params) {
          var lChart = RGChart.cache[config.link];
          currentIndex = params.dataIndex;
          if (_.isEmpty(lChart)) {
            console.error('link to chart obj is not existed');
          } else {
            lChart.dispatchAction({
              type: 'highlight',
              seriesIndex: 0,
              dataIndex: currentIndex
            });
            lChart.dispatchAction({
              type: 'showTip',
              seriesIndex: 0,
              dataIndex: currentIndex
            });
          }
        })
      }
    }
  );

  RGChart.cache = {};

  function error(option) {
    console.error(option + ' option type is not correct');
  }

  function extend(o1, o2, override, hasOwnProperty) {
    for(var i in o2)
      if((!hasOwnProperty || o2.hasOwnProperty(i)) && (override || o1[i] === undefined))
        o1[i] = o2[i]
    return o1;
  }

})(Regular, echarts, _);