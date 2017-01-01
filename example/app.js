/*
 * -------------------------------------------------------
 * @author   hzwangdong5(hzwangdong5@corp.netease.com)
 * -------------------------------------------------------
 */

new Regular({
  template: document.getElementById('appTpl'),
  config: function(){

    function action(params){
      alert(params);
    }

    this.data.config = {
      // 主题设置
      theme: 'dark',
      // 事件设置
      event : {
        click : action
      },
      // 数据区间开关
      dataZoom : true,
      // 右上角工具栏开关
      toolbox : true,
      // 组件标识唯一id
      name: 'chart1',
      // 指定联动的组件,通过唯一标识来指定
      link : 'chart2'
    }

    this.data.option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    }

    this.data.config2 = {
      event : {
        click : action
      },
      dataZoom : true,
      theme: 'dark',
      name: 'chart2'
    }

    this.data.option2 = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    }

  },
  remove:function(){
    this.$refs.c1.destroy(); // 销毁组件后,如何初始化?
  },
  theme:function(){
    this.data.config.theme = 'vintage';
    this.$refs.c1.render();
  },
  reset:function () {
    this.$refs.c1.render();
    this.$refs.c2.render();
  }

}).$inject('#app');